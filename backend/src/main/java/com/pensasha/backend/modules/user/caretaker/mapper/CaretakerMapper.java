package com.pensasha.backend.modules.user.caretaker.mapper;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.pensasha.backend.modules.user.Role;
import com.pensasha.backend.modules.user.caretaker.CaretakerProfile;

@Mapper(componentModel = "spring")
public interface CaretakerMapper {

    // ====================== Entity -> Get DTO ======================
    @Mapping(target = "firstName", expression = "java(caretakerProfile.getUser().getFirstName())")
    @Mapping(target = "middleName", expression = "java(caretakerProfile.getUser().getMiddleName())")
    @Mapping(target = "lastName", expression = "java(caretakerProfile.getUser().getLastName())")
    @Mapping(target = "phoneNumber", expression = "java(caretakerProfile.getUser().getPhoneNumber())")
    @Mapping(target = "email", expression = "java(caretakerProfile.getUser().getEmail())")
    @Mapping(target = "profilePicture", expression = "java(caretakerProfile.getUser().getProfilePictureUrl())")
    @Mapping(target = "idNumber", expression = "java(caretakerProfile.getUser().getIdNumber())")
    @Mapping(target = "roles", expression = "java(rolesToStrings(caretakerProfile.getUser().getRoles()))")
    @Mapping(target = "permissions", expression = "java(mapPermissions(caretakerProfile.getUser().getRoles()))")
    @Mapping(target = "propertyId", expression = "java(caretakerProfile.getAssignedProperty() != null ? caretakerProfile.getAssignedProperty().getId() : null)")
    com.pensasha.backend.modules.user.caretaker.dto.GetCaretakerDTO toGetDTO(CaretakerProfile caretakerProfile);

    // ====================== Create DTO -> Entity ======================
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "assignedProperty", ignore = true)
    CaretakerProfile toEntity(com.pensasha.backend.modules.user.caretaker.dto.CreateCaretakerDTO caretakerDTO);

    // ====================== Helper Methods ======================
    @Named("rolesToStrings")
    default Set<String> rolesToStrings(Set<Role> roles) {
        if (roles == null || roles.isEmpty()) return Set.of();
        return roles.stream().map(Role::getName).collect(Collectors.toSet());
    }

    default Set<String> mapPermissions(Set<Role> roles) {
        if (roles == null || roles.isEmpty()) return Set.of();
        Set<String> permissions = new HashSet<>();
        for (Role role : roles) {
            if (role.getPermissions() != null) {
                role.getPermissions().forEach(p -> permissions.add(p.getName()));
            }
        }
        return permissions;
    }
}