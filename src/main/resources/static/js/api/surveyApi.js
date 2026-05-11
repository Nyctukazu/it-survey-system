
const BASE_URL = 'http://localhost:8080/api/surveys';

export const fetchSurveyQuestions = async () => {
    try {
        const response = await fetch(`${BASE_URL}`);
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


