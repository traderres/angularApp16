package com.lessons.controllers;

import com.lessons.models.ExceptionRecordDTO;
import com.lessons.services.ExceptionRecordService;
import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
public class ExceptionRecordController {

    @Resource
    private ExceptionRecordService exceptionRecordService;

    @RequestMapping(value="/api/exceptions/list", method = RequestMethod.GET, produces = "application/json")
    @PreAuthorize("hasAnyRole('APP16_SPECIALIST', 'APP16_SUPERVISOR',  'APP16_ADMIN', 'APP16_REVIEWER')")
    public ResponseEntity<?> getAllExceptions() {

        // Get the list of exceptions (using the service)
        List<ExceptionRecordDTO> listOfExceptions = exceptionRecordService.getAllExceptions();

        // Return the information back to the frontend (and convert java objects to JSON objects)
        return ResponseEntity.status(HttpStatus.OK)
                             .body(listOfExceptions);
    }
}
