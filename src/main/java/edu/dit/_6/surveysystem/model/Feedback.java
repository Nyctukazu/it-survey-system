package edu.dit._6.surveysystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@Entity
@JsonPropertyOrder({ "id", "respondentName", "respondentEmail", "submittedDate", "comment", "rating" })
public class Feedback extends BaseSubmission {
    @Column(length = 1000)
    private String comment;
    private int rating;

    // Getters and Setters
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }
}
