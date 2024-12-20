package com.lessons.controllers;

import com.lessons.models.AcknowledgementStatusDTO;
import com.lessons.services.AcknowledgementService;
import com.lessons.services.UserService;
import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AcknowledgementController {

    @Resource
    private AcknowledgementService acknowledgementService;

    @Resource
    private UserService userService;

    /**
     * GET /api/user/ack/get
     */
    @RequestMapping(value = "/api/acknowledge/get", method = RequestMethod.GET, produces = "application/json")
    @PreAuthorize("hasAnyRole('APP16_SUPERVISOR', 'APP16_SPECIALIST', 'APP16_ADMIN', 'APP16_REVIEWER')")
    public ResponseEntity<?> getUserAcknowledged() {

        // Determine if the user has acknowledged the DOD consent
        boolean userAcknowledgedFlag = acknowledgementService.hasUserAcknowledgedDodConsentRecently(userService.getLoggedInUserId());

        // Put the flag into a DTO
        AcknowledgementStatusDTO dto = new AcknowledgementStatusDTO(userAcknowledgedFlag);

        // Return a response of 200 and the UserAcknowledgedConsentDTO back to the frontend
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }


    /**
     * PUT /api/user/ack/set
     */
    @RequestMapping(value = "/api/acknowledge/set", method = RequestMethod.PUT, produces = "application/json")
    @PreAuthorize("hasAnyRole('APP16_SUPERVISOR', 'APP16_SPECIALIST', 'APP16_ADMIN', 'APP16_REVIEWER')")
    public ResponseEntity<?> setUserAcknowledged() {

        // Run a transaction to mark this user as acknowledging the DOD consent in the database *AND* session
        acknowledgementService.markUserAsAcknowledgeDodConsent();

        // Return a response of 200
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

}
