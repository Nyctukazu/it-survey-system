package edu.dit._6.surveysystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.util.List;
import java.util.ArrayList;

@Entity
@JsonPropertyOrder({ "id", "respondentName", "respondentEmail", "submittedDate" })
public class SurveyResponse extends BaseSubmission {
 
    @OneToMany(mappedBy = "surveyResponse", cascade = CascadeType.ALL)
    private List<Answer> answers = new ArrayList();

    // Getters and Setters
    public List<Answer> getAnswers() { return answers; }
    public void setAnswers(List<Answer> answers) { this.answers = answers; }

}
