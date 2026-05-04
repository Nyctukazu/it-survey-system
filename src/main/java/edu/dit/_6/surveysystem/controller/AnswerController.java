package edu.dit._6.surveysystem.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.dit._6.surveysystem.model.Answer;
import edu.dit._6.surveysystem.service.AnswerService;


@RestController
@RequestMapping("/api/answers")
public class AnswerController {
    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @PostMapping 
    public ResponseEntity<String> submitAnswers(@RequestBody List<Answer> answers) {
        if (answers == null || answers.isEmpty()) {
            return ResponseEntity.badRequest().body("No answers provided.");
        }
        answerService.saveUserAnswers(answers);
        return ResponseEntity.ok("Submission successful! Thank you for your feedback.");
    } 

    @GetMapping
    public List<Answer> getAll() {
        return answerService.getAllAnswers();
    }
}
