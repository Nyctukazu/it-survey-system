package edu.dit._6.surveysystem.service;

import java.util.List;

import org.springframework.stereotype.Service;
import edu.dit._6.surveysystem.repository.AnswerRepository;
import edu.dit._6.surveysystem.model.Answer;
import edu.dit._6.surveysystem.repository.QuestionRepository;
import edu.dit._6.surveysystem.model.Question;


@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;

    public AnswerService(AnswerRepository answerRepository, QuestionRepository questionRepository) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
    }

    public List<Answer> getAllAnswers() {
        return answerRepository.findAll();
    }

    public void saveUserAnswers(List<Answer> answers) {
        for (Answer ans : answers) {
            if (ans.getQuestion() != null) {
                Long qId = ans.getQuestion().getId();
                Question q = questionRepository.findById(qId)
                            .orElseThrow(() -> new RuntimeException("Question not found"));
                ans.setQuestion(q);
            }
            answerRepository.save(ans);
        }
    }
}
