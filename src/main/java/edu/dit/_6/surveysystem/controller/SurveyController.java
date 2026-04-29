package edu.dit._6.surveysystem.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.dit._6.surveysystem.model.SurveyForm;
import edu.dit._6.surveysystem.service.SurveyService;



@RestController
@RequestMapping("/api/surveys")
public class SurveyController {
    private final SurveyService surveyService;

    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @PostMapping
    public ResponseEntity<SurveyForm> createSurvey(@RequestBody SurveyForm form) {
        return ResponseEntity.ok(surveyService.createSurvey(form));
    }
    
    @GetMapping
    public List<SurveyForm> getAll() {
        return surveyService.getAllSurveys();
    }
    
    
}
