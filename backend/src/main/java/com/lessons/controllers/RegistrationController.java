package com.lessons.controllers;

import com.lessons.models.RegisterUserDTO;
import com.lessons.services.RegistrationService;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class RegistrationController {
    private static final Logger logger = LoggerFactory.getLogger(RegistrationController.class);

    @Resource
    private RegistrationService registrationService;

    @RequestMapping(value = "/api/register/user", method = RequestMethod.POST, produces = "application/json")
    @PreAuthorize("hasAnyRole('APP16_SUPERVISOR', 'APP16_SPECIALIST', 'APP16_ADMIN', 'APP16_REVIEWER')")
    public ResponseEntity<?> registerUser(@RequestBody RegisterUserDTO aDTO) {

        this.registrationService.registerUser(aDTO);

        // Return a 200 status code
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
