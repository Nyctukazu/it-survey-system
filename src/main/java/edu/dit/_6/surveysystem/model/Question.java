package edu.dit._6.surveysystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;


import java.util.List;
import java.util.ArrayList;

@Entity
@JsonPropertyOrder({ "id", "content", "type", "isRequired", "choices", "answer", "surveyForm"})
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private String type;
    private Boolean isRequired;

    @ManyToOne
    @JoinColumn(name = "survey_form_id")
    @JsonIgnoreProperties("questions")
    private SurveyForm surveyForm;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Choice> choices = new ArrayList<>();

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Answer> answers = new ArrayList<>();

    public Question() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public SurveyForm getSurveyForm() { return surveyForm; }
    public void setSurveyForm(SurveyForm surveyForm) { this.surveyForm = surveyForm; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Boolean getIsRequired() { return isRequired; }
    public void setIsRequired(Boolean isRequired) { this.isRequired = isRequired; }

    public List<Choice> getChoices() { return choices; }
    public void setChoices(List<Choice> choices) { this.choices = choices; }

    public List<Answer> getAnswer() { return answers; }
    public void setAnswer(List<Answer> answers) { this.answers = answers; }

}
