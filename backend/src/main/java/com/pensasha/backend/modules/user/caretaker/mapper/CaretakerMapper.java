package com.pensasha.backend.modules.user.caretaker.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.pensasha.backend.modules.user.Role;
import com.pensasha.backend.modules.user.caretaker.CaretakerProfile;
import com.pensasha.backend.modules.user.caretaker.dto.GetCaretakerDTO;
import com.pensasha.backend.modules.user.caretaker.dto.CreateCaretakerDTO;

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
    GetCaretakerDTO toGetDTO(CaretakerProfile caretakerProfile);

    // ====================== Create DTO -> Entity ======================
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true) // Link separately in service
    @Mapping(target = "assignedProperty", ignore = true) // Assign manually in service
    CaretakerProfile toEntity(CreateCaretakerDTO caretakerDTO);

    // ====================== Helper Methods ======================
    @Named("rolesToStrings")
    default Set<String> rolesToStrings(Set<Role> roles) {
        if (roles == null || roles.isEmpty()) return Set.of();
        return roles.stream().map(Role::getName).collect(Collectors.toSet());
    }

    default Set<String> mapPermissions(Set<Role> roles) {
        if (roles == null || roles.isEmpty()) return Set.of();
        return roles.stream()
                .flatMap(role -> role.getPermissions().stream())
                .map(p -> p.getName())
                .collect(Collectors.toSet());
    }
}