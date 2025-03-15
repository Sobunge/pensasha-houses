package com.pensasha.backend.user.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pensasha.backend.role.Role;
import com.pensasha.backend.user.models.LandLord;
import com.pensasha.backend.user.models.User;
import com.pensasha.backend.user.models.dto.CareTakerDTO;
import com.pensasha.backend.user.models.dto.LandLordDTO;
import com.pensasha.backend.user.models.dto.UpdateUserDTO;
import com.pensasha.backend.user.repositories.UserRepository;
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

        User user = new User();
        copyCommonAttributes(user, updatedUserDTO);

        return userRepository.save(updatedUser);
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
    private void copyCommonAttributes(User user, UserDTO dto) {

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
