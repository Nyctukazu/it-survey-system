
const survey_Url = 'http://localhost:8080/api/surveys';

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
    const response = await fetch('http://localhost:8080/api/responses', {
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