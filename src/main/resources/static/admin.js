// ==========================================
// ADMIN PANEL LOGIC
// ==========================================

console.log("Admin Dashboard Loaded Successfully!");

// --- UI Elements ---
const loginView = document.getElementById('login-view');
const adminApp = document.getElementById('admin-app');
const btnLogin = document.getElementById('btn-login');

// Sidebar Elements
const hamburgerBtn = document.getElementById('hamburger-menu');
const closeSidebarBtn = document.getElementById('close-sidebar');
const sidebar = document.getElementById('sidebar');
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
const adminSections = document.querySelectorAll('.admin-section');

// Navigation Elements
const btnNavFeedback = document.getElementById('btn-nav-feedback');
const btnNavSurveys = document.getElementById('btn-nav-surveys');
const btnLogout = document.getElementById('btn-logout');
const sectionFeedback = document.getElementById('section-feedback');
const sectionSurveys = document.getElementById('section-surveys');
const btnSettingsBack = document.getElementById('btn-settings-back');

// ==========================================
// LOGIN & LOGOUT LOGIC
// ==========================================
if (btnLogin) {
    btnLogin.addEventListener('click', () => {
        loginView.classList.add('hidden');
        adminApp.classList.remove('hidden');
        
        // Draw charts after container is visible
        setTimeout(() => { initCharts(); }, 100);
    });
}

if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        // Hide the app and show login screen
        adminApp.classList.add('hidden');
        loginView.classList.remove('hidden');
        
        // Safely clear the input fields for security
        const userIn = document.getElementById('admin-username');
        const passIn = document.getElementById('admin-password');
        if(userIn) userIn.value = '';
        if(passIn) passIn.value = '';
        
        // Reset the view back to the Dashboard so it's fresh for the next login
        switchToDashboard();
    });
}

// ==========================================
// NAVIGATION & SCROLLING LOGIC
// ==========================================

// Helper function to safely ensure we are on the Dashboard tab
function switchToDashboard() {
    // 1. Un-highlight all sidebar links
    sidebarLinks.forEach(l => l.classList.remove('active'));
    
    // 2. Safely find the dashboard link and highlight it
    const dashLink = document.querySelector('[data-target="view-dashboard"]');
    if (dashLink) {
        dashLink.classList.add('active');
    }
    
    // 3. Hide all sections on the page
    adminSections.forEach(sec => sec.classList.add('hidden'));
    
    // 4. Safely find the dashboard view and show it
    const dashView = document.getElementById('view-dashboard');
    if (dashView) {
        dashView.classList.remove('hidden');
    }
}

// Top Bar Scrolling
if (btnNavFeedback && sectionFeedback) {
    btnNavFeedback.addEventListener('click', () => {
        switchToDashboard();
        setTimeout(() => {
            sectionFeedback.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    });
}

if (btnNavSurveys && sectionSurveys) {
    btnNavSurveys.addEventListener('click', () => {
        switchToDashboard();
        setTimeout(() => {
            sectionSurveys.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    });
}

// Settings Back Button
if (btnSettingsBack) {
    btnSettingsBack.addEventListener('click', () => {
        switchToDashboard();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Sidebar Logic (Pop from Right)
if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
    });
}

if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
}

// Sidebar Links
sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        sidebarLinks.forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
        
        const targetId = e.target.getAttribute('data-target');
        adminSections.forEach(sec => sec.classList.add('hidden'));
        document.getElementById(targetId).classList.remove('hidden');
        
        // Auto-close sidebar after clicking a link
        sidebar.classList.remove('open');
        
        // Scroll to the top of the new section
        window.scrollTo(0, 0);
    });
});


// ==========================================
// DYNAMIC DATABASE & EDITOR LOGIC
// ==========================================

// 1. Upgraded Database: Each survey now holds an ARRAY of questions!
const mockSurveyDatabase = {
    "Survey 1": [
        { isRequired: true, type: "Checkbox", content: "What is the primary mode of emergency communication available for tourists?", options: ["Megaphones", "Digital Signage", "Sirens", "Local Staff"] }
    ],
    "Survey 2": [
        { isRequired: true, type: "Radio", content: "Do you have an emergency survival kit prepared in your home?", options: ["Yes", "No", "Not Sure"] }
    ],
    "Survey 3": [
        { isRequired: false, type: "Text", content: "Please describe any hazards or blockages near your primary evacuation route.", options: [] }
    ],
    "Survey 4": [
        { isRequired: true, type: "Checkbox", content: "Which of the following emergency supplies do you currently possess?", options: ["Flashlight", "First Aid Kit", "Bottled Water"] }
    ],
    "Survey 5": [
        { isRequired: false, type: "Radio", content: "Are you familiar with the local emergency contact numbers?", options: ["Yes", "No"] }
    ]
};

// Global variable to track which survey we are currently editing
let currentActiveSurvey = null;

// UI Elements
const editSurveyBtns = document.querySelectorAll('.edit-survey-btn');
const editorSurveyTitle = document.getElementById('editor-survey-title');
const questionsContainer = document.getElementById('editor-questions-container');
const btnAddPage = document.getElementById('btn-add-page');
const btnDeleteQuestion = document.getElementById('btn-delete-question');
const btnSaveSurvey = document.getElementById('btn-save-survey');

// --- 2. THE QUESTION GENERATOR ---
function createQuestionCard(data) {
    const card = document.createElement('div');
    card.className = 'editor-card widget-card question-block';
    card.style.marginBottom = '20px';

    card.innerHTML = `
        <div class="form-row">
            <strong>isRequired:</strong> 
            <label class="switch"><input type="checkbox" class="q-is-req" ${data.isRequired ? 'checked' : ''}><span class="slider round"></span></label>
        </div>
        <div class="form-row">
            <strong>Type:</strong> 
            <select class="dark-select q-type">
                <option value="Label" ${data.type === 'Label' ? 'selected' : ''}>Label</option>
                <option value="Checkbox" ${data.type === 'Checkbox' ? 'selected' : ''}>Checkbox</option>
                <option value="Radio" ${data.type === 'Radio' ? 'selected' : ''}>Radio</option>
                <option value="Text" ${data.type === 'Text' ? 'selected' : ''}>Text</option>
            </select>
        </div>
        <div class="form-row" style="align-items: flex-start;">
            <strong>Content:</strong>
            <textarea class="dark-textarea q-content" rows="2" placeholder="Type your question here...">${data.content}</textarea>
        </div>
        <div class="options-list q-options-list"></div>
        <button class="text-btn btn-add-option" style="color: var(--brand-accent); margin-top: 15px; margin-left: 100px;">+ Add options</button>
    `;

    // Internal Elements for this specific card
    const typeSelect = card.querySelector('.q-type');
    const optionsList = card.querySelector('.q-options-list');
    const addOptBtn = card.querySelector('.btn-add-option');

    // Helper: Add an individual option row
    function addOptionRow(val = '', inputType) {
        const row = document.createElement('div');
        row.style.display = 'flex'; row.style.alignItems = 'center'; row.style.marginBottom = '10px';
        row.className = 'option-row';
        row.innerHTML = `
            <input type="${inputType}" disabled style="margin-right: 15px;">
            <input type="text" class="opt-val" value="${val}" placeholder="Type option here..." style="background: transparent; color: white; border: 1px solid rgba(255,255,255,0.3); padding: 8px; border-radius: 4px; width: 300px; font-family: 'Inter', sans-serif; outline: none;">
            <button class="text-btn remove-option-btn" style="color: #ff4d4d; font-size: 1.2rem; margin-left: 10px; cursor: pointer;">&times;</button>
        `;
        row.querySelector('.remove-option-btn').addEventListener('click', () => row.remove());
        optionsList.appendChild(row);
    }

    // Helper: Update UI based on question type
    function updateTypeUI() {
        const t = typeSelect.value;
        if (t === 'Text') {
            optionsList.innerHTML = `<input type="text" disabled placeholder="[ Respondent will type their answer here ]" style="width: 100%; max-width: 400px; background: rgba(255,255,255,0.05); color: white; border: 1px dashed rgba(255,255,255,0.5); padding: 10px; border-radius: 4px; font-family: 'Inter', sans-serif; cursor: not-allowed;">`;
            addOptBtn.style.display = 'none';
        } else if (t === 'Label') {
            optionsList.innerHTML = '';
            addOptBtn.style.display = 'none';
        } else {
            addOptBtn.style.display = 'inline-block';
            if (optionsList.innerHTML.includes('Respondent will type')) optionsList.innerHTML = '';
            const inputType = t === 'Radio' ? 'radio' : 'checkbox';
            const existingInputs = optionsList.querySelectorAll('.option-row input[type="radio"], .option-row input[type="checkbox"]');
            existingInputs.forEach(input => input.type = inputType);
        }
    }

    // Wiring up local buttons
    addOptBtn.addEventListener('click', () => {
        const inputType = typeSelect.value === 'Radio' ? 'radio' : 'checkbox';
        addOptionRow('', inputType);
    });

    typeSelect.addEventListener('change', updateTypeUI);

    // Initial render of options
    if (data.type === 'Checkbox' || data.type === 'Radio') {
        const inputType = data.type === 'Radio' ? 'radio' : 'checkbox';
        data.options.forEach(opt => addOptionRow(opt, inputType));
    }
    updateTypeUI(); // Run once to set visibility

    return card;
}

// --- 3. LOADING A SURVEY ---
function loadSurveyDataIntoEditor(surveyTitle) {
    currentActiveSurvey = surveyTitle;
    
    // Safety check: Only update the title if the HTML element exists!
    if (editorSurveyTitle) {
        editorSurveyTitle.textContent = surveyTitle;
    }
    
    // Safety check: Only load questions if the container exists!
    if (questionsContainer) {
        questionsContainer.innerHTML = ''; // Clear old questions
        
        const questionsArr = mockSurveyDatabase[surveyTitle] || [];
        questionsArr.forEach(qData => {
            const card = createQuestionCard(qData);
            questionsContainer.appendChild(card);
        });
    } else {
        console.error("ERROR: Could not find 'editor-questions-container' in the HTML!");
    }
}

// Attach the click listeners to Dashboard Survey cards
editSurveyBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        loadSurveyDataIntoEditor(event.target.getAttribute('data-title'));
        
        sidebarLinks.forEach(l => l.classList.remove('active'));
        const editorLink = document.querySelector('[data-target="view-editor"]');
        if(editorLink) editorLink.classList.add('active');
        
        adminSections.forEach(sec => sec.classList.add('hidden'));
        document.getElementById('view-editor').classList.remove('hidden');
        window.scrollTo(0, 0);
    });
});

// --- 4. TOP BAR ACTIONS (Add, Delete, Save) ---

// ADD A NEW PAGE (Blank Question)
if (btnAddPage) {
    btnAddPage.addEventListener('click', () => {
        const newBlankQuestion = { isRequired: false, type: "Checkbox", content: "", options: [] };
        const newCard = createQuestionCard(newBlankQuestion);
        questionsContainer.appendChild(newCard);
        
        // Scroll to the bottom so the user sees the new question!
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
}

// DELETE THE BOTTOM-MOST QUESTION
if (btnDeleteQuestion) {
    btnDeleteQuestion.addEventListener('click', () => {
        if (questionsContainer.lastElementChild) {
            questionsContainer.removeChild(questionsContainer.lastElementChild);
        } else {
            alert("No questions left to delete!");
        }
    });
}

// SAVE THE CURRENT SURVEY
if (btnSaveSurvey) {
    btnSaveSurvey.addEventListener('click', () => {
        if (!currentActiveSurvey) return;

        const savedQuestions = [];
        const questionBlocks = questionsContainer.querySelectorAll('.question-block');

        // Scrape the data out of every single card on the page
        questionBlocks.forEach(card => {
            const isReq = card.querySelector('.q-is-req').checked;
            const type = card.querySelector('.q-type').value;
            const content = card.querySelector('.q-content').value;
            const options = [];

            if (type === 'Checkbox' || type === 'Radio') {
                const optInputs = card.querySelectorAll('.opt-val');
                optInputs.forEach(inp => options.push(inp.value));
            }

            savedQuestions.push({ isRequired: isReq, type: type, content: content, options: options });
        });

        // Save it to the database!
        mockSurveyDatabase[currentActiveSurvey] = savedQuestions;
        alert(`Success! ${currentActiveSurvey} has been saved.`);
        console.log("Current Database State:", mockSurveyDatabase);
    });
}

// --- 5. EDITOR DROPDOWN LOGIC ---
const btnTitleDropdown = document.getElementById('btn-title-dropdown');
const titleDropdownList = document.getElementById('editor-title-dropdown-list');

if (titleDropdownList && btnTitleDropdown) {
    // Generate the dropdown list from our Mock Database
    const surveyNames = Object.keys(mockSurveyDatabase);
    surveyNames.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        
        // When a user clicks a survey in the list:
        li.addEventListener('click', () => {
            loadSurveyDataIntoEditor(name); // Load the new data!
            titleDropdownList.classList.add('hidden'); // Close the menu
        });
        
        titleDropdownList.appendChild(li);
    });

    // Open/Close the menu when the arrow is clicked
    btnTitleDropdown.addEventListener('click', (e) => {
        e.stopPropagation(); // Stops the click from instantly closing the menu
        titleDropdownList.classList.toggle('hidden');
    });

    // Click anywhere else on the page to safely close the menu
    document.addEventListener('click', () => {
        if (!titleDropdownList.classList.contains('hidden')) {
            titleDropdownList.classList.add('hidden');
        }
    });
}


// ==========================================
// GRAPHS (Chart.js)
// ==========================================
function initCharts() {
    // 1. Total Responses Bar Chart
    const ctxBar = document.getElementById('barChart');
    if (ctxBar) {
        new Chart(ctxBar.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Survey 1', 'Survey 2', 'Survey 3', 'Survey 4', 'Survey 5'],
                datasets: [{
                    data: [30, 40, 35, 75, 40],
                    backgroundColor: '#90B918', // Brand Green
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: '#eee' }, max: 100 },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // 2. Survey 1 Line Chart
    const ctxLine = document.getElementById('lineChart');
    if (ctxLine) {
        new Chart(ctxLine.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    data: [20, 75, 55, 90, 100, 60, 90],
                    borderColor: '#90B918',
                    backgroundColor: 'rgba(144, 185, 24, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.1 // Gives it that sharp, jagged look from the design
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: '#eee' }, max: 125 },
                    x: { grid: { color: '#eee' } }
                }
            }
        });
    }
}