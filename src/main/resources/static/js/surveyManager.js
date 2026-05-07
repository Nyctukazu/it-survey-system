import { surveyPages } from './main.js';
import { currentPageIndex } from './main.js';

export const finalSurveyData = { demographics: {}, answers: {} };

export function saveCurrentAnswers() {
    const currentPageData = surveyPages[currentPageIndex];
    
    currentPageData.questions.forEach(question => {
        const nameSelector = `[name="${question.id}"]`;
        
        switch (question.type) {
            case "CHECKBOX":
                const checks = document.querySelectorAll(`${nameSelector}:checked`);
                finalSurveyData.answers[question.id] = Array.from(checks).map(c => c.value);
                break;

            case "RADIO":
                const checked = document.querySelector(`${nameSelector}:checked`);
                if (checked) finalSurveyData.answers[question.id] = checked.value;
                break;

            case "TEXTBOX":
                const textInputs = document.querySelectorAll(`input[name^="${question.id}_"]`);
    
                if (textInputs.length > 0) {
       
                const values = Array.from(textInputs).map(input => input.value.trim());
        
       
                if (values.some(v => v !== "")) {
                    finalSurveyData.answers[question.id] = values;
                }
            }
            break;
            case "DROPDOWN":
            case "DATE":
                const input = document.querySelector(`${nameSelector}`);
                if (input && input.value.trim() !== "") {
                    finalSurveyData.answers[question.id] = input.value;
                }
                break;
        }
    });
    console.log(finalSurveyData);
}

export function prepareDataForBackend() {
    const answersMap = finalSurveyData.answers;

    const formattedAnswers = Object.keys(answersMap).map(questionId => {
        let value = answersMap[questionId];
        const finalValue = Array.isArray(value) ? value.join(", ") : value;

        return {
            responseValue: finalValue,
            question: { id: parseInt(questionId) }
        };
    });

    return formattedAnswers;
}

export async function submitSurvey() {
    saveCurrentAnswers();
    const surveySubmission = {
        respondentName: document.getElementById('userName').value || "Anonymous",
        answers: prepareDataForBackend()

    }
    
    try {
        const response = await fetch('http://localhost:8080/api/responses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(surveySubmission)
        });

        if (response.ok) {
            console.log("Survey Submitted!");
            goToNextPage();

        } else {
            const errorText = await response.text();
            alert("Submittion failed: " + errorText);
        }
    } catch (error) {
        console.error("Connection error:", error);
        alert("Cannot reach the server. Make sure your Spring Boot app is running.");
    }
}