package com.lessons.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AcknowledgementStatusDTO {

    @JsonProperty("userHasAcknowledged")
    private final boolean userHasAcknowledged;

    public AcknowledgementStatusDTO(boolean userHasAcknowledged) {
        this.userHasAcknowledged = userHasAcknowledged;
    }

    public boolean getUserHasAcknowledged() {
        return userHasAcknowledged;
    }
}
