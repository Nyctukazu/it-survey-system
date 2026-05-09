import { fetchSurveyQuestions } from './api/surveyService.js';
import { createQuestionHTML } from './surveyRenderer.js';
import { saveCurrentAnswers, finalSurveyData, submitSurvey } from './surveyManager.js';
import { goToNextPage } from './event.js';

export let currentPageIndex = 0; 
export let surveyPages = [];

// UI Elements: Views & Steps
const landingPage = document.getElementById('landing-page');
const surveyApp = document.getElementById('survey-app');
const stepIndicator = document.getElementById('step-indicator');

const stepPrivacy = document.getElementById('step-privacy');
const stepDemographics = document.getElementById('step-demographics');
const stepSurvey = document.getElementById('step-survey');

// ==========================================
// SIDEBAR LOGIC (Hamburger Menu)
// ==========================================
const closeBtn = document.getElementById('close-sidebar');
const sidebar = document.getElementById('sidebar');
// FIX: Use querySelectorAll to find EVERY hamburger menu on the page
const hamburgerBtns = document.querySelectorAll('.hamburger'); 

// Open sidebar when ANY hamburger is clicked
hamburgerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        sidebar.classList.add('open');
    });
});

// Close sidebar
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
}

// Close sidebar when clicking a link inside it
const sidebarLinks = document.querySelectorAll('.sidebar-links a');
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        // 1. Close the sidebar
        sidebar.classList.remove('open');
        
        // 2. NEW FIX: If the Survey App is currently showing, hide it and show the Landing Page!
        if (!surveyApp.classList.contains('hidden')) {
            surveyApp.classList.add('hidden');
            landingPage.classList.remove('hidden');
        }
        
        // The browser will now automatically scroll to #home or #about because the page is visible again!
    });
});

// UI Elements: Buttons
const btnGoToSurvey = document.getElementById('btn-go-to-survey');
const btnPrivacyBack = document.getElementById('btn-privacy-back');
const btnPrivacyNext = document.getElementById('btn-privacy-next');
const btnDemoBack = document.getElementById('btn-demo-back');
const btnDemoNext = document.getElementById('btn-demo-next');

const btnNext = document.getElementById('btn-next-page');
const btnBack = document.getElementById('btn-back-page');
const btnSubmit = document.getElementById('btn-submit');

// --- MASTER FLOW LOGIC ---

// 1. Landing -> Privacy
btnGoToSurvey.addEventListener('click', () => {
    landingPage.classList.add('hidden');
    surveyApp.classList.remove('hidden');
    stepIndicator.innerText = "Step 1 of 4";
    window.scrollTo(0, 0);
});

// 2. Privacy -> Landing
btnPrivacyBack.addEventListener('click', () => {
    surveyApp.classList.add('hidden');
    landingPage.classList.remove('hidden');
    window.scrollTo(0, 0);
});

// 3. Privacy -> Demographics
btnPrivacyNext.addEventListener('click', () => {
    const consent = document.querySelector('input[name="consent"]:checked');
    if (!consent || consent.value !== "agree") {
        alert("You must agree to the Privacy Policy to proceed.");
        return;
    }
    stepPrivacy.classList.add('hidden');
    stepDemographics.classList.remove('hidden');
    stepIndicator.innerText = "Step 2 of 4";
    window.scrollTo(0, 0);
});

// 4. Demographics -> Privacy
btnDemoBack.addEventListener('click', () => {
    stepDemographics.classList.add('hidden');
    stepPrivacy.classList.remove('hidden');
    stepIndicator.innerText = "Step 1 of 4";
    window.scrollTo(0, 0);
});

// 5. Demographics -> Dynamic Survey
btnDemoNext.addEventListener('click', async () => {
    // Save Demographics
    finalSurveyData.demographics.name = document.getElementById('userName').value;
    finalSurveyData.demographics.age = document.getElementById('userAge').value;
    finalSurveyData.demographics.contact = document.getElementById('userContact').value;
    finalSurveyData.demographics.address = document.getElementById('userAddress').value;
    finalSurveyData.demographics.gender = document.getElementById('userGender').value; 
    
    try {
        btnDemoNext.innerText = "Loading...";
        surveyPages = await fetchSurveyQuestions();
    
        stepDemographics.classList.add('hidden');
        stepSurvey.classList.remove('hidden');
        
        renderCurrentPage();

        // FIX: Reset the button text back to "Next" right after it finishes loading!
        btnDemoNext.innerText = "Next"; 
        
    } catch (error) {
        alert("Could not load survey questions. Please try again later.");
        btnDemoNext.innerText = "Next";
    }
});

// --- DYNAMIC SURVEY BUILDER (Step 3 & 4) ---
function renderCurrentPage() {
    const container = document.getElementById('dynamic-questions-container');
    const title = document.getElementById('dynamic-page-title');
    
    const currentPageData = surveyPages[currentPageIndex];
    title.textContent = currentPageData.title;
    container.innerHTML = ''; 

    // Update Step Indicator (Step 3 is the survey, but we pretend it's step 3 for all pages here, or 3 of 4)
    stepIndicator.innerText = "Step 3 of 4";

    currentPageData.questions.forEach(question => {
        const qBlock = document.createElement('div');
        qBlock.className = 'question-block';
        qBlock.innerHTML = createQuestionHTML(question, finalSurveyData.answers[question.id]);
        container.appendChild(qBlock);
    });

    // 1. Back Button Logic
    btnBack.classList.remove('hidden'); // Always show the back button!

    // 2. Next/Submit Logic
    if (currentPageIndex === surveyPages.length - 1) {
        btnNext.classList.add('hidden'); 
        btnSubmit.classList.remove('hidden'); 
        stepIndicator.innerText = "Step 4 of 4"; // Final review step
    } else {
        btnNext.classList.remove('hidden');
        btnSubmit.classList.add('hidden');
    }
    window.scrollTo(0, 0);
}

// Survey Navigation Events
btnNext.addEventListener('click', () => {
    saveCurrentAnswers(); 
    currentPageIndex++; 
    renderCurrentPage(); 
});

btnBack.addEventListener('click', () => {
    saveCurrentAnswers(); 
    
    if (currentPageIndex === 0) {
        // If we are on the very first survey page, go back to Demographics!
        stepSurvey.classList.add('hidden');
        stepDemographics.classList.remove('hidden');
        stepIndicator.innerText = "Step 2 of 4";
        window.scrollTo(0, 0);
    } else {
        // Otherwise, just go to the previous survey page
        currentPageIndex--; 
        renderCurrentPage(); 
    }
});

btnSubmit.addEventListener('click', async (event) => {
    event.preventDefault();
    saveCurrentAnswers(); 
    btnSubmit.innerText = "Submitting...";
    
    // submitSurvey handles the backend call, and then triggers goToNextPage() via event.js!
    await submitSurvey();
});

document.querySelector('form')?.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});

// Expose globally for modular files if needed
window.saveCurrentAnswers = saveCurrentAnswers;
window.goToNextPage = goToNextPage;