package com.pensasha.backend.modules.user.caretaker.mapper;

import org.mapstruct.Mapper;

import com.pensasha.backend.modules.user.caretaker.Caretaker;

@Mapper(componentModel = "spring")
public interface CaretakerMapper {

    Caretaker toDTO (Caretaker caretaker);

}
