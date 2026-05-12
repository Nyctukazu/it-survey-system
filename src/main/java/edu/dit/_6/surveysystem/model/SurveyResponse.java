package edu.dit._6.surveysystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.util.List;
import java.util.ArrayList;

@Entity
@JsonPropertyOrder({ "id", "respondentName", "submittedDate", "respondentAge", "respondentContact", "respondentEmail", "respondentAddress", "respondentGender" })
public class SurveyResponse extends BaseSubmission {

    private Integer respondentAge;
    private String respondentContact;
    private String respondentAddress;
    private String respondentGender;
 
    @OneToMany(mappedBy = "surveyResponse", cascade = CascadeType.ALL)
    private List<Answer> answers = new ArrayList();

    // Getters and Setters
    public List<Answer> getAnswers() { return answers; }
    public void setAnswers(List<Answer> answers) { this.answers = answers; }

    public Integer getRespondentAge() { return respondentAge; }
    public void setRespondentAge(Integer respondentAge) { this.respondentAge = respondentAge; }

    public String getRespondentContact() { return respondentContact; }
    public void setRespondentContact(String respondentContact) { this.respondentContact = respondentContact; }

    public String getRespondentAddress() { return respondentAddress; }
    public void setRespondentAddress(String respondentAddress) { this.respondentAddress = respondentAddress; }

    public String getRespondentGender() { return respondentGender; }
    public void setRespondentGender(String respondentGender) { this.respondentGender = respondentGender; }


}
