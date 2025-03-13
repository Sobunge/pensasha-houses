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

    // Getting all caretaker details
    @GetMapping("/all")
    public ResponseEntity<PagedModel<EntityModel<CareTaker>>> getAllCareTakers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<CareTaker> careTakerPage = careTakerService.gettingAllCareTakers(pageable);

        if (careTakerPage.isEmpty()) {
            return ResponseEntity.ok().body(PagedModel.empty());
        }

        List<EntityModel<CareTaker>> careTakerResources = careTakerPage.getContent().stream()
                .map(careTaker -> EntityModel.of(careTaker,
                        linkTo(methodOn(CareTakerController.class).getCareTaker(careTaker.getIdNumber()))
                                .withSelfRel()))
                .collect(Collectors.toList());

        PagedModel.PageMetadata metadata = new PagedModel.PageMetadata(size, page, careTakerPage.getTotalElements());

        PagedModel<EntityModel<CareTaker>> response = PagedModel.of(careTakerResources, metadata,
                linkTo(methodOn(CareTakerController.class).getAllCareTakers(0, size)).withRel("first-page"),
                linkTo(methodOn(CareTakerController.class).getAllCareTakers(page, size)).withSelfRel(),
                linkTo(methodOn(CareTakerController.class).getAllCareTakers(careTakerPage.getTotalPages() - 1, size))
                        .withRel("last-page"));

        return ResponseEntity.ok(response);
    }

    // Getting caretaker details
    @GetMapping("/{idNumber}")
    public ResponseEntity<EntityModel<CareTaker>> getCareTaker(@PathVariable String idNumber) {
        Optional<CareTaker> careTaker = careTakerService.gettingCareTaker(idNumber);

        if (careTaker.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        EntityModel<CareTaker> response = EntityModel.of(careTaker.get(),
                linkTo(methodOn(CareTakerController.class).getCareTaker(idNumber)).withSelfRel(),
                linkTo(methodOn(CareTakerController.class).getAllCareTakers(1, 10)).withRel("all-users"));

        return ResponseEntity.ok(response);
    }

    // Deleting caretaker details
    @DeleteMapping("/{idNumber}")
    public ResponseEntity<EntityModel<ApiResponse>> deleteCareTakerDetails(@PathVariable String idNumber) {

        Optional<CareTaker> optionalCareTaker = careTakerService.gettingCareTaker(idNumber);

        if (optionalCareTaker.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(EntityModel.of(new ApiResponse("Caretaker not found with the provided ID number")));
        }

        careTakerService.deleteCareTaker(idNumber);

        EntityModel<ApiResponse> response = EntityModel.of(new ApiResponse("Caretaker details deleted successfully"),
                linkTo(methodOn(CareTakerController.class).getAllCareTakers(1, 10)).withRel("all-users"));

        return ResponseEntity.ok(response);
    }

    // Adding caretaker details
    @PostMapping("/register")
    public ResponseEntity<?> addingCareTakerDetails(@Valid @RequestBody CareTaker careTaker,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // Extract simple error messages
            List<String> errors = bindingResult.getFieldErrors().stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage()) // Shorter message
                    .collect(Collectors.toList());

            return ResponseEntity.badRequest().body(Map.of("errors", errors));
        }

        Optional<CareTaker> optionalCareTaker = careTakerService.gettingCareTaker(careTaker.getIdNumber());

        if (!optionalCareTaker.isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(EntityModel.of(careTaker,
                            linkTo(methodOn(UserController.class).gettingUser(careTaker.getIdNumber())).withSelfRel()));
        }

        careTaker.setRole(Role.CARETAKER);
        CareTaker savedCareTaker = careTakerService.addCareTaker(careTaker);

        EntityModel<User> careTakerModel = EntityModel.of(savedCareTaker,
                linkTo(methodOn(UserController.class).gettingUser(savedCareTaker.getIdNumber())).withSelfRel(),
                linkTo(methodOn(UserController.class).getAllUsers(1, 10)).withRel("all-users"));

        return ResponseEntity.status(HttpStatus.CREATED).body(careTakerModel);
    }

    // Updating caretaker details

}
