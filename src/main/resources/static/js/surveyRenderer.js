export function createQuestionHTML(question, savedAnswer) {
    let htmlSnippet = `<div class="question-text">${question.content}</div>`;
    htmlSnippet += `<div class="options-container">`;

    switch (question.type) {
        case "RADIO":
            question.choices.forEach(opt => {
                const isChecked = savedAnswer === opt.text ? "checked" : "";
                htmlSnippet += `
                    <label style="margin-right: 20px; display: inline-block;">
                        <input type="radio" name="${question.id}" value="${opt.text}" ${isChecked}> ${opt.text}
                    </label>`;
            });
            break;

        case "CHECKBOX":
            const savedArray = savedAnswer || [];
            question.choices.forEach(opt => {
                const isChecked = savedArray.includes(opt.text) ? "checked" : "";
                htmlSnippet += `<label style="display:block;"><input type="checkbox" name="${question.id}" value="${opt.text}" ${isChecked}> ${opt.text}</label>`;
            });
            break;

        case "TEXTBOX":
            const savedText = savedAnswer || [];
            question.choices.forEach((opt, index) => {
                const val = savedText[index] || "";
                htmlSnippet += `
                    <div style="margin-bottom: 10px;">
                        <input type="text" name="${question.id}_${index}" value="${val}" placeholder="${opt.text}" style="width: 100%; padding: 8px; box-sizing: border-box;">
                    </div>
                `;
            });
            break;
        case "DATE":
            const val = savedAnswer || "";
            htmlSnippet += `<input type="date" name="${question.id}" value="${val}" style="width:100%">`;
            break;

        case "DROPDOWN":
            const selected = savedAnswer || "";
            htmlSnippet += `<select name="${question.id}">`;
            question.choices.forEach(opt => {
                htmlSnippet += `<option value="${opt.text}" ${selected === opt.text ? 'selected' : ''}>${opt.text}</option>`;
            });
            htmlSnippet += `</select>`;
            break;
    }

    htmlSnippet += `</div>`;
    return htmlSnippet;
}
