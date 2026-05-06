import { fetchSurveyQuestions } from './api/surveyService.js';
import { createQuestionHTML } from './surveyRenderer.js';
import { saveCurrentAnswers, finalSurveyData, submitSurvey } from './surveyManager.js';
import { goToNextPage } from './event.js';

export let currentPageIndex = 0; 
export let surveyPages = [];

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
        qBlock.innerHTML = createQuestionHTML(question, finalSurveyData.answers[question.id]);
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
btnSubmit.addEventListener('click', async (event) => {
    event.preventDefault();
    saveCurrentAnswers(); 
    await submitSurvey();
    console.log("SURVEY COMPLETE! READY FOR BACKEND:", finalSurveyData);
    alert("Survey finished! Check your console for the final data.");
});

document.querySelector('form').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});

window.saveCurrentAnswers = saveCurrentAnswers;
window.goToNextPage = goToNextPage;
