package com.pensasha.backend.user.controllers;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pensasha.backend.role.Role;
import com.pensasha.backend.user.models.CareTaker;
import com.pensasha.backend.user.models.User;
import com.pensasha.backend.user.models.dto.ApiResponse;
import com.pensasha.backend.user.models.dto.UpdateUserDTO;
import com.pensasha.backend.user.services.CareTakerService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping(path = "/user/caretaker")
@Validated
public class CareTakerController {

    @Autowired
    private CareTakerService careTakerService;

    // Updating caretaker details
    @PutMapping("update/{idNumber}")
    public ResponseEntity<EntityModel<CareTaker>> updateCareTakerDetails(@PathVariable String idNumber,
            @RequestBody UpdateUserDTO updateUserDTO) {

        Optional<CareTaker> optionalCareTaker = careTakerService.gettingCareTaker(idNumber);

        if (optionalCareTaker.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        CareTaker careTaker = optionalCareTaker.get();
        careTaker.setFirstName(updateUserDTO.getFirstName());
        careTaker.setSecondName(updateUserDTO.getSecondName());
        careTaker.setThirdName(updateUserDTO.getThirdName());
        careTaker.setIdNumber(updateUserDTO.getIdNumber());
        careTaker.setPhoneNumber(updateUserDTO.getPhoneNumber());

        CareTaker savedCareTaker = careTakerService.addCareTaker(careTaker);

        EntityModel<CareTaker> careTakerModel = EntityModel.of(savedCareTaker,
                linkTo(methodOn(CareTakerController.class).getCareTaker(savedCareTaker.getIdNumber())).withSelfRel(),
                linkTo(methodOn(CareTakerController.class).getAllCareTakers(1, 10)).withRel("all-users"));

        return ResponseEntity.status(HttpStatus.OK).body(careTakerModel);
    }

}
