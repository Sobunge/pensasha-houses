package com.pensasha.backend.modules.user.caretaker.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.pensasha.backend.modules.user.Role;
import com.pensasha.backend.modules.user.caretaker.CaretakerProfile;
import com.pensasha.backend.modules.user.caretaker.dto.CreateCaretakerDTO;
import com.pensasha.backend.modules.user.caretaker.dto.GetCaretakerDTO;

@Mapper(componentModel = "spring")
public interface CaretakerMapper {

    // ====================== Entity -> Get DTO ======================
    @Mapping(source = "user.firstName", target = "firstName")
    @Mapping(source = "user.middleName", target = "middleName")
    @Mapping(source = "user.lastName", target = "lastName")
    @Mapping(source = "user.phoneNumber", target = "phoneNumber")
    @Mapping(source = "user.email", target = "email")
    @Mapping(source = "user.profilePictureUrl", target = "profilePicture")
    @Mapping(target = "roles", source = "user.roles", qualifiedByName = "rolesToStrings")
    @Mapping(target = "permissions", expression = "java(mapPermissions(caretakerProfile.getUser().getRoles()))")
    @Mapping(source = "user.idNumber", target = "idNumber")
    @Mapping(target = "propertyId", expression = "java(caretakerProfile.getAssignedProperty() != null ? caretakerProfile.getAssignedProperty().getId() : null)")
    GetCaretakerDTO toGetDTO(CaretakerProfile caretakerProfile);

    // ====================== Create DTO -> Entity ======================
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true) // Linked separately in service
    @Mapping(target = "assignedProperty", ignore = true) // assign manually in service if needed
    CaretakerProfile toEntity(CreateCaretakerDTO caretakerDTO);

    // ====================== Helper Methods ======================
    @Named("rolesToStrings")
    default Set<String> rolesToStrings(Set<Role> roles) {
        if (roles == null || roles.isEmpty())
            return Set.of();
        return roles.stream()
                .map(Role::getName) // map Role entity to its name
                .collect(Collectors.toSet());
    }

    default Set<String> mapPermissions(Set<Role> roles) {
        if (roles == null || roles.isEmpty())
            return Set.of();
        return roles.stream()
                .flatMap(role -> role.getPermissions().stream())
                .map(p -> p.getName())
                .collect(Collectors.toSet());
    }
}