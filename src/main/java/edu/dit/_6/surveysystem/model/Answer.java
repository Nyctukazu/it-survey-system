package edu.dit._6.surveysystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;



@Entity
@Table(name = "answers")
@JsonPropertyOrder({ "id", "responseValue", "question"})
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String responseValue;

    @ManyToOne
    @JoinColumn(name = "question_id")
    @JsonIgnore
    private Question question;

    public Answer() { }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getResponseValue() { return responseValue; }
    public void setResponseValue(String responseValue) { this.responseValue = responseValue; }

    public Question getQuestion() { return question; }
    public void setQuestion(Question question) { this.question = question; }

    
}
