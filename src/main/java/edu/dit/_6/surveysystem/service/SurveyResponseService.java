package edu.dit._6.surveysystem.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import edu.dit._6.surveysystem.repository.SurveyResponseRepository;
import edu.dit._6.surveysystem.model.Answer;
import edu.dit._6.surveysystem.model.SurveyResponse;

@Service
public class SurveyResponseService {
    @Autowired
    private SurveyResponseRepository responseRepo;

    @Transactional
    public SurveyResponse saveFullResponse(SurveyResponse response) {
        if (responseRepo.existsByRespondentEmail(response.getRespondentEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already submitted");
        }

        if (response.getAnswers() != null) {
            for (Answer answer : response.getAnswers()) {
                answer.setSurveyResponse(response);
            }
        }
        return responseRepo.save(response);
    }
}
