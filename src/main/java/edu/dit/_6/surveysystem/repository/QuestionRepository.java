package edu.dit._6.surveysystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import edu.dit._6.surveysystem.model.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    
}
