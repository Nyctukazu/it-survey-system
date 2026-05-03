let surveyPages = [];
import { fetchSurveyQuestions } from './api/surveyService.js';


// 2. Tracking our state
let currentPageIndex = 0; 
const finalSurveyData = { demographics: {}, answers: {} };

// 3. UI Elements
const stepDemographics = document.getElementById('step-demographics');
const stepSurvey = document.getElementById('step-survey');
const btnStart = document.getElementById('btn-start-survey');
const btnNext = document.getElementById('btn-next-page');
const btnBack = document.getElementById('btn-back-page');
const btnSubmit = document.getElementById('btn-submit');


// 4. Start Survey Button Logic
btnStart.addEventListener('click', async () => {
    finalSurveyData.demographics.name = document.getElementById('userName').value;
    finalSurveyData.demographics.age = document.getElementById('userAge').value;
    finalSurveyData.demographics.contact = document.getElementById('userContact').value;
    finalSurveyData.demographics.address = document.getElementById('userAddress').value;
    finalSurveyData.demographics.familyMembers = document.getElementById('familyMembers').value;
    
    try {
        btnStart.innerText = "Loading...";
        surveyPages = await fetchSurveyQuestions();
    
        stepDemographics.classList.add('hidden');
        stepSurvey.classList.remove('hidden');
    
        renderCurrentPage();
    } catch (error) {
        alert("Could not load survey questions. Please try again later.");
        btnStart.innerText = "Start Survey";
    }
});

// 5. THE BUILDER FUNCTION
function renderCurrentPage() {
    const container = document.getElementById('dynamic-questions-container');
    const title = document.getElementById('dynamic-page-title');
    
    const currentPageData = surveyPages[currentPageIndex];
    title.textContent = currentPageData.title;
    container.innerHTML = ''; 

    currentPageData.questions.forEach(question => {
        const qBlock = document.createElement('div');
        qBlock.className = 'question-block';

        let htmlSnippet = `<div class="question-text">${question.content}</div>`;

        // Check our finalSurveyData to see if they already answered this!
        const savedAnswer = finalSurveyData.answers[question.id];

        htmlSnippet += `<div class="options-container">`;
        if (question.type === "RADIO") {
            question.choices.forEach(opt => {
            const isChecked = savedAnswer === opt ? "checked" : "";
            htmlSnippet += `
                <label style="margin-right: 20px; display: inline-block;">
                    <input type="radio" name="${question.id}" value="${opt}" ${isChecked}> ${opt.text}
                </label>`;
            });

        } 
        else if (question.type === "CHECKBOX") {
            // Checkboxes save arrays, so we default to an empty array if undefined
            const savedArray = savedAnswer || []; 
            question.choices.forEach(opt => {
                // Check if this specific option is in their saved answers
                const isChecked = savedArray.includes(opt) ? "checked" : "";
                htmlSnippet += `<label style="display:block; margin-bottom:8px;"><input type="checkbox" name="${question.id}" value="${opt}" ${isChecked}> ${opt.text}</label>`;
            });
        }

        htmlSnippet += `</div>`;

        qBlock.innerHTML = htmlSnippet;
        container.appendChild(qBlock);
    });

    // --- BUTTON VISIBILITY LOGIC ---

    // 1. Back Button: Hide on page 1 (index 0), show everywhere else
    if (currentPageIndex === 0) {
        btnBack.classList.add('hidden');
    } else {
        btnBack.classList.remove('hidden');
    }

    // 2. Next/Submit: Show Submit on the last page, otherwise show Next
    if (currentPageIndex === surveyPages.length - 1) {
        btnNext.classList.add('hidden'); 
        btnSubmit.classList.remove('hidden'); 
    } else {
        btnNext.classList.remove('hidden');
        btnSubmit.classList.add('hidden');
    }
}

// 6. Navigation Button Logic
btnNext.addEventListener('click', () => {
    saveCurrentAnswers(); 
    currentPageIndex++; 
    renderCurrentPage(); 
});

// Back Button Logic
btnBack.addEventListener('click', () => {
    saveCurrentAnswers(); // Save current page just in case they typed something before hitting back
    currentPageIndex--; // Move the bookmark backward
    renderCurrentPage(); 
});

// 7. Submit Button Logic
btnSubmit.addEventListener('click', () => {
    saveCurrentAnswers(); 
    console.log("SURVEY COMPLETE! READY FOR BACKEND:", finalSurveyData);
    alert("Survey finished! Check your console for the final data.");
});

// 8. Gather Data Function
function saveCurrentAnswers() {
    const currentPageData = surveyPages[currentPageIndex];
    
    currentPageData.questions.forEach(question => {
        if (question.type === "RADIO") {
            const checked = document.querySelector(`input[name="${question.id}"]:checked`);
            if (checked) {
                finalSurveyData.answers[question.id] = checked.value;
            }
        } else if (question.type === "CHECKBOX") {
            const checks = document.querySelectorAll(`input[name="${question.id}"]:checked`);
            let selected = [];
            checks.forEach(c => selected.push(c.value));
            if (selected.length > 0) {
                finalSurveyData.answers[question.id] = selected;
            }
        }
    });
}