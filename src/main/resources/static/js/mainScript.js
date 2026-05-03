// 1. THE MASTER LIST
const surveyPages = [
    {
        pageTitle: "Preparedness Check",
        questions: [
            { id: "q1", text: "Do you have an Emergency Kit?", type: "yes-no" },
            { id: "q2", text: "Do you have working flashlights?", type: "yes-no" }
        ]
    },
    {
        pageTitle: "Evacuation Planning",
        questions: [
            { 
                id: "q3", 
                text: "Where is your primary Evacuation Place?", 
                type: "checkbox", 
                options: ["Barangay Hall", "Bunker", "Local Shelter", "School"] 
            },
            { id: "q4", text: "Do you know the evacuation route?", type: "yes-no" }
        ]
    },
    {
        pageTitle: "Local Tourism Impacts",
        questions: [
            { id: "q5", text: "Has flooding affected local tourist spots recently?", type: "yes-no" },
            { 
                id: "q6", 
                text: "Which tourist spots are most vulnerable?", 
                type: "checkbox", 
                options: ["City Plaza", "Riverwalk Park", "Mountain Trail"] 
            }
        ]
    }
];

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
btnStart.addEventListener('click', () => {
    finalSurveyData.demographics.name = document.getElementById('userName').value;
    finalSurveyData.demographics.age = document.getElementById('userAge').value;
    finalSurveyData.demographics.contact = document.getElementById('userContact').value;
    finalSurveyData.demographics.address = document.getElementById('userAddress').value;
    finalSurveyData.demographics.familyMembers = document.getElementById('familyMembers').value;
    
    stepDemographics.classList.add('hidden');
    stepSurvey.classList.remove('hidden');
    
    renderCurrentPage();
});

// 5. THE BUILDER FUNCTION
function renderCurrentPage() {
    const container = document.getElementById('dynamic-questions-container');
    const title = document.getElementById('dynamic-page-title');
    
    const currentPageData = surveyPages[currentPageIndex];
    title.textContent = currentPageData.pageTitle;
    container.innerHTML = ''; 

    currentPageData.questions.forEach(question => {
        const qBlock = document.createElement('div');
        qBlock.className = 'question-block';

        let htmlSnippet = `<div class="question-text">${question.text}</div>`;

        // Check our finalSurveyData to see if they already answered this!
        const savedAnswer = finalSurveyData.answers[question.id];

        if (question.type === "yes-no") {
            // Determine if Yes or No should be pre-checked
            const isYesChecked = savedAnswer === "Yes" ? "checked" : "";
            const isNoChecked = savedAnswer === "No" ? "checked" : "";

            htmlSnippet += `
                <div class="options-container">
                    <label><input type="radio" name="${question.id}" value="Yes" ${isYesChecked}> Yes</label>
                    <label style="margin-left: 20px;"><input type="radio" name="${question.id}" value="No" ${isNoChecked}> No</label>
                </div>
            `;
        } 
        else if (question.type === "checkbox") {
            // Checkboxes save arrays, so we default to an empty array if undefined
            const savedArray = savedAnswer || []; 
            
            htmlSnippet += `<div class="options-container">`;
            question.options.forEach(opt => {
                // Check if this specific option is in their saved answers
                const isChecked = savedArray.includes(opt) ? "checked" : "";
                htmlSnippet += `<label style="display:block; margin-bottom:8px;"><input type="checkbox" name="${question.id}" value="${opt}" ${isChecked}> ${opt}</label>`;
            });
            htmlSnippet += `</div>`;
        }

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
        if (question.type === "yes-no") {
            const checked = document.querySelector(`input[name="${question.id}"]:checked`);
            if (checked) {
                finalSurveyData.answers[question.id] = checked.value;
            }
        } else if (question.type === "checkbox") {
            const checks = document.querySelectorAll(`input[name="${question.id}"]:checked`);
            let selected = [];
            checks.forEach(c => selected.push(c.value));
            if (selected.length > 0) {
                finalSurveyData.answers[question.id] = selected;
            }
        }
    });
}