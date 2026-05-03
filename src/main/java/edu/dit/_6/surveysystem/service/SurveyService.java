package edu.dit._6.surveysystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.dit._6.surveysystem.model.SurveyForm;
import edu.dit._6.surveysystem.repository.SurveyRepository;
import edu.dit._6.surveysystem.model.Question;
import edu.dit._6.surveysystem.model.Choice;
import edu.dit._6.surveysystem.model.Answer;

@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;

    public SurveyService(SurveyRepository surveyRepository) {
        this.surveyRepository = surveyRepository;
    }

    public List<SurveyForm> getAllSurveys() {
        return surveyRepository.findAll();
    }

    public SurveyForm saveSurvey(SurveyForm form) {
        return surveyRepository.save(form);
    }

    public SurveyForm getSurveyById(Long id) {
        return surveyRepository.findById(id).orElseThrow(() ->
            new RuntimeException("Survey not found"));
    }

    public SurveyForm createSurvey(SurveyForm form) {
        if (form.getQuestions() != null) {
            for (Question question : form.getQuestions()) {
                question.setSurveyForm(form);

                if (question.getChoices() != null) {
                    for (Choice choice : question.getChoices()) {
                        choice.setQuestion(question);
                    }
                }
            }
        }
        return surveyRepository.save(form);
    }



    
}
