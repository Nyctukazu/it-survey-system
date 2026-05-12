
const survey_Url = 'http://localhost:8080/api/surveys';
const response_Url = 'http://localhost:8080/api/responses';
const feedback_Url = 'http://localhost:8080/api/feedback';

export const fetchSurveyQuestions = async () => {
    try {
        const response = await fetch(`${survey_Url}`);
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("fetch failed:", error);
        throw error;
    }
};

export const postSurveyResults = async (submission) => {
    const response = await fetch(`${response_Url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
    });

    if (response.ok) {
        console.log("Survey Submitted!");
        goToNextPage();

    } else {
        const errorText = await response.text();
        alert("Submittion failed: " + errorText);
    }
}

export const postFeedback = async (submission) => {
    const response = await fetch(`${feedback_Url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
    });

    if (response.ok) {
        console.log("Feedback Submitted!");
        window.location.href = 'index.html';

    } else {
        const errorText = await response.text();
        alert("Submittion failed: " + errorText);
    }
}