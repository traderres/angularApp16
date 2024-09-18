package com.lessons.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserRegistrationInfoDTO {
    @JsonProperty("registrationState")
    private Integer registrationState;

    public Integer getRegistrationState() {
        return registrationState;
    }

    public void setRegistrationState(Integer registrationState) {
        this.registrationState = registrationState;
    }
}
