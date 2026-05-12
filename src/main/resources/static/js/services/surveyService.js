import { fetchSurveyQuestions } from '../api/surveyApi.js';

export const getOrganizedSurveys = async () => {
    const data = await fetchSurveyQuestions();
    // Do business logic here (like sorting by date)
    return data.sort((a, b) => b.id - a.id);
};

