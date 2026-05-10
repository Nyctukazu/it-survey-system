package edu.dit._6.surveysystem.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.dit._6.surveysystem.model.Feedback;
import edu.dit._6.surveysystem.service.FeedbackService;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;

    }
    @GetMapping
    public List<Feedback> getAll() {
        return feedbackService.getAllFeedback();
    }

    @PostMapping
    public ResponseEntity<Feedback> submitFeedback(@RequestBody Feedback feedback) {
        Feedback saved = feedbackService.saveFeedback(feedback);
        return ResponseEntity.ok(saved);
    }
}

