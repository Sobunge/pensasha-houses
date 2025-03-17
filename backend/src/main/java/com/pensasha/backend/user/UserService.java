package com.pensasha.backend.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pensasha.backend.user.models.CareTaker;
import com.pensasha.backend.user.models.LandLord;
import com.pensasha.backend.user.models.Role;
import com.pensasha.backend.user.models.Tenant;
import com.pensasha.backend.user.models.User;
import com.pensasha.backend.user.models.dto.CareTakerDTO;
import com.pensasha.backend.user.models.dto.LandLordDTO;
import com.pensasha.backend.user.models.dto.TenantDTO;
import com.pensasha.backend.user.models.dto.UpdatePasswordDTO;
import com.pensasha.backend.user.models.dto.UpdateUserDTO;
import com.pensasha.backend.user.models.dto.UserDTO;

import jakarta.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject password encoder

    // Adding a new user (Admin)
    @Transactional
    public User addUser(UserDTO userDTO) {

        User user;

        if (userDTO instanceof CareTakerDTO careTakerDTO) {

            CareTaker careTaker = new CareTaker();
            copyCommonAttributes(careTaker, careTakerDTO);
            careTaker.setAssignedProperty(convertToPropertyEntities(careTakerDTO.getAssignedProperty()));

            user = careTaker;

        } else if (userDTO instanceof LandLordDTO landLordDTO) {

            LandLord landLord = new LandLord();
            copyCommonAttributes(landLord, landLordDTO);
            landLord.setProperties(convertToPropertyEntities(landLordDTO.getProperties()));
            landLord.setBankDetails(convertToBankDetailsEntity(landLordDTO.getBankDetails()));

            user = landLord;

        } else if (userDTO instanceof TenantDTO tenantDTO) {

            Tenant tenant = new Tenant();
            copyCommonAttributes(tenant, tenantDTO);
            tenant.setRentalUnit(convertToRentalUnitEntity(tenantDTO.getRentalUnit()));
            tenant.setLeaseStartDate(convertToLeaseStartEntity(tenantDTO.getLeaseStartDate()));
            tenant.setLeaseEndDate(convertToLeaseEndEntity(tenantDTO.getLeaseEndDate()));
            tenant.setMonthlyRent(convertToMonthlyRentEntity(tenantDTO.getMonthlyRent()));
            tenant.setEmergencyContact(convertToEmergencyContactEntity(tenantDTO.getEmergencyContact()));

            user = tenant;
        } else {

            user = new User();
            copyCommonAttributes(user, userDTO);
        }

        return userRepository.save(user);

    }

    // Editing common user details
    public User updateUserDetails(UpdateUserDTO updatedUserDTO) {

        User user = userRepository.findByIdNumber(updatedUserDTO.getIdNumber()).get();

        user.setFirstName(updatedUserDTO.getFirstName());
        user.setSecondName(updatedUserDTO.getSecondName());
        user.setThirdName(updatedUserDTO.getThirdName());
        user.setIdNumber(updatedUserDTO.getIdNumber());
        user.setPhoneNumber(updatedUserDTO.getPhoneNumber());

        return userRepository.save(user);
    }

    public String updateUserPassword(String idNumber, UpdatePasswordDTO updatePasswordDTO) {

        Optional<User> user = userRepository.findByIdNumber(idNumber);

        if (user.isPresent()) {
            if (passwordEncoder.matches(user.get().getPassword(), updatePasswordDTO.getCurrentPassword())) {

                if (updatePasswordDTO.getNewPassword().equals(updatePasswordDTO.getConfirmNewPassword())) {
                    user.get().setPassword(passwordEncoder.encode(updatePasswordDTO.getNewPassword()));
                    return "Password changed successfully";
                } else {
                    return "New password does not match the confirmed password";
                }

            } else {
                return "Current password entered does not match existing password";
            }
        } else {
            return "User with this id: " + idNumber + " not found.";
        }

    }

    // Deleting a user (Admin)
    public void deleteUser(String idNumber) {

        Optional<User> user = userRepository.findByIdNumber(idNumber);
        userRepository.deleteById(user.get().getId());

    }

    // Getting a single user (Admin)
    public Optional<User> gettingUser(String idNumber) {
        return userRepository.findByIdNumber(idNumber);
    }

    // Getting all users (Admin)
    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    // Getting a user by role
    public Page<User> gettingUsersByRole(Role role, Pageable pageable) {
        return userRepository.findAllByRole(role, pageable);
    }

    // Helper method to copy common attributes
    private void copyCommonAttributes(User user, UserDTO userDTO) {

        user.setFirstName(userDTO.getFirstName());
        user.setSecondName(userDTO.getSecondName());
        user.setThirdName(userDTO.getThirdName());
        user.setIdNumber(userDTO.getIdNumber());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setRole(userDTO.getRole());

        if (userDTO.getProfilePicture() != null && !userDTO.getProfilePicture().isEmpty()) {
            user.setProfilePicture(userDTO.getProfilePicture());
        }
    }

}
