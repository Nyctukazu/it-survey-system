import { fetchSurveyQuestions } from '../api/surveyApi.js';

export const getOrganizedSurveys = async () => {
    const data = await fetchSurveyQuestions();
    // Do business logic here (like sorting by date)
    return data.sort((a, b) => b.id - a.id);
};

export const getDemographicData = () => {
    return {
        respondentName: document.getElementById('userName').value || "Anonymous",
        respondentAge: parseInt(document.getElementById('userAge').value),
        respondentContact: document.getElementById('userContact').value,
        respondentEmail: document.getElementById('userEmail').value,
        respondentAddress: document.getElementById('userAddress').value,
        respondentGender: document.getElementById('userGender').value
    };
};