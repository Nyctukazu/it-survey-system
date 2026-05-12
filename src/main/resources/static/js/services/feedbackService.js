import { postFeedback } from "../api/surveyApi.js";

document.getElementById('btn-submit-feedback').addEventListener('click', async () => {
            const nameField = document.getElementById('feedbackName').value || "Anonymous";
            const textField = document.getElementById('feedbackText').value;
            console.log(nameField);
            // Make sure they actually typed something!
            if (textField.trim() === "") {
                alert("Please enter some feedback before submitting.");
                return;
            }

            // Change button text so the user knows it's working
            const submitBtn = document.getElementById('btn-submit-feedback');
            submitBtn.innerText = "Sending...";

            // Package the data into JSON
            const feedbackData = {
                respondentName: nameField,
                comment: textField
            };

            try {
                // Send it to your leader's Spring Boot backend!
                await postFeedback(feedbackData);
            } catch (error) {
                console.error("Connection error:", error);
                alert("Cannot reach the server. Make sure the backend is running.");
                submitBtn.innerText = "Submit Feedback";
            }
        });