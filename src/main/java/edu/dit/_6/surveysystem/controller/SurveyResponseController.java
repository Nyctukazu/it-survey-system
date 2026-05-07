package edu.dit._6.surveysystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;

import edu.dit._6.surveysystem.model.SurveyResponse;
import edu.dit._6.surveysystem.repository.SurveyResponseRepository;
import edu.dit._6.surveysystem.service.SurveyResponseService;


@RestController
@RequestMapping("api/responses")
public class SurveyResponseController {
    @Autowired
    private SurveyResponseService responseService;
    private SurveyResponseRepository responseRepository;

    public SurveyResponseController(SurveyResponseService responseService, SurveyResponseRepository responseRepository) {
        this.responseService = responseService;
        this.responseRepository = responseRepository;
    }   

    @PostMapping
    public ResponseEntity<SurveyResponse> submit(@RequestBody SurveyResponse response) {
        SurveyResponse saved = responseService.saveFullResponse(response);
        return ResponseEntity.ok(saved);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<SurveyResponse> getResponseById(@PathVariable Long id) {
        return responseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
