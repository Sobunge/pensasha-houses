package com.pensasha.backend.modules.user.caretaker.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

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
    @Mapping(source = "user.role", target = "role")
    @Mapping(source = "user.idNumber", target = "idNumber")
    @Mapping(source = "assignedProperty.id", target = "propertyId") // added mapping for propertyId
    GetCaretakerDTO toGetDTO(CaretakerProfile caretakerProfile);

    // ====================== Create DTO -> Entity ======================
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true) // Linked separately in service
    @Mapping(target = "assignedProperty", ignore = true) // assign manually in service if needed
    CaretakerProfile toEntity(CreateCaretakerDTO caretakerDTO);
}
