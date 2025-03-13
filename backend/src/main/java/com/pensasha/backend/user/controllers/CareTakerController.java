package com.pensasha.backend.user.controllers;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.List;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pensasha.backend.user.models.CareTaker;
import com.pensasha.backend.user.models.dto.ApiResponse;
import com.pensasha.backend.user.services.CareTakerService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping(path = "/user/caretaker")
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
    @PutMapping("/{idNumber}")
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

    // Updating caretaker details

}
