package edu.dit._6.surveysystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.dit._6.surveysystem.model.SurveyForm;
import edu.dit._6.surveysystem.repository.FeedbackRepository;
import edu.dit._6.surveysystem.model.Feedback;

@Service
public class FeedbackService {
    private FeedbackRepository feedbackRepo;

    public FeedbackService(FeedbackRepository feedbackRepo) {
        this.feedbackRepo = feedbackRepo;
    }

    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepo.save(feedback);
    }

    public Feedback getFeedbackById(Long id) {
        return feedbackRepo.findById(id).orElseThrow(() -> 
            new RuntimeException("Feedback not found"));
    }

    public List<Feedback> getAllFeedback() {
        return feedbackRepo.findAll();
    }

    
}
