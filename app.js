const ui = new UI();

function getRandomInt(max) {
    return Math.ceil(Math.random() * max);
}

function generateQuestions(operator, maxOperand1, maxOperand2, count) {
    const questions = [];
    for (let i = 0; i < count; i++) {
        let operand1 = getRandomInt(maxOperand1);
        let operand2 = getRandomInt(maxOperand2);

        if (operator == "/") {
            operand1 = operand1 * operand2;
        } else if (operator == "-" && operand1 < operand2) {
            const temp = operand1;
            operand1 = operand2;
            operand2 = temp;
        }
        questions.push(`${operand1} ${operator} ${operand2}`);
    }
    return questions;
}

function generateAndShowQuestions(e, operator) {
    e.preventDefault();

    const maxOperand1 = ui.getMaxOperand1();
    const maxOperand2 = ui.getMaxOperand2();
    const questionCount = ui.getCount();

    questions = generateQuestions(operator, maxOperand1, maxOperand2, questionCount);
    ui.showQuestions(questions);
    ui.hideGeneratorSection();
}

function checkAnswers() {
    const questionElements = ui.getQuestionElements();
    const count = questionElements.length;

    let correctCount = 0;
    questionElements.forEach((questionElement) => {
        const id = questionElement.id;
        const index = id.substring("question".length);
        const answerElement = ui.getAnswerElement(index);

        const question = questionElement.textContent;
        const expectedAnswer = eval(question);

        if (expectedAnswer == answerElement.value) {
            answerElement.setAttribute("disabled", "");
            correctCount++;
        }
    });

    const score = (correctCount / count) * 100;
    if (correctCount == count) {
        ui.showAlert("You get all answers correct! You Are Awesome!", true);
        ui.disableCheckAnswersButton();
    } else {
        ui.showAlert("You get score: " + score + ", please check your answers", false);
    }
}

document.addEventListener("DOMContentLoaded", () => ui.init());

ui.additionButton.addEventListener("click", (e) => generateAndShowQuestions(e, "+"));
ui.subtractionButton.addEventListener("click", (e) => generateAndShowQuestions(e, "-"));
ui.multiplicationButton.addEventListener("click", (e) => generateAndShowQuestions(e, "*"));
ui.divisionButton.addEventListener("click", (e) => generateAndShowQuestions(e, "/"));
ui.checkAnswersButton.addEventListener("click", checkAnswers);
