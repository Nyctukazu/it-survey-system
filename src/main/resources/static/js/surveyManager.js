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
            case "DROPDOWN":
            case "DATE":
                const input = document.querySelector(`${nameSelector}`);
                if (input && input.value.trim() !== "") {
                    finalSurveyData.answers[question.id] = input.value;
                }
                break;
        }
    });
}
