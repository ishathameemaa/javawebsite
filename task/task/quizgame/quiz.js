const question=[
  {
    question: "Who is the father of the computer?",
    answers: [
      {text: "Tomas Edison", correct:false},
      {text: "Charles Babbage", correct:true},
      {text: "Isaac Newton", correct:false},
      {text: "Albert Eistein", correct:false},
    ]
  },
  {
    question: "What is the full form of E-mail?",
    answers: [
      {text: "Electric Mail", correct:false},
      {text: "Exchange Mail ", correct:false},
      {text: "Electronic Mail", correct:true},
      {text: "Engagement Mail", correct:false},
    ]
  },
  {
    question: "In the virtual world WWW stands for?",
    answers: [
      {text: "World Wide Window", correct:false},
      {text: "World Wide Web ", correct:true},
      {text: "World Wide Web Applications", correct:false},
      {text: "World Wide Warehouse", correct:false},
    ]
  },
  {
    question: "What do you need to use to connect to the internet?",
    answers: [
      {text: "Mouse", correct:false},
      {text: "Modem ", correct:true},
      {text: "CPU", correct:false},
      {text: "Keyboard", correct:false},
    ]

  },
  {
    question: "How much is a byte equal to?",
    answers: [
      {text: "8 bits", correct:true},
      {text: "16bits", correct:false},
      {text: "32bits", correct:true},
      {text: "64bits", correct:false},
    ]
  }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex =0;
let score=0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML="Next";
  showQuestion();
}
function showQuestion(){
  resetState();
  let currentQuestion = question[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML=questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach(answer =>{
    const button= document.createElement("button");
    button.innerHTML=answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct= answer.correct;
    }
    button.addEventListener("click",selectAnswer);
  });
}

function resetState(){
  nextButton.style.display="none"
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e){
  const selectedBtn=e.target;
  const isCorrect= selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button=> {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = "true";
  });
  nextButton.style.display="block";
}
function showScore(){
  resetState();
  questionElement.innerHTML=`Your score is ${score} out of ${question.length}!`;
  nextButton.innerHTML="Play Again";
  nextButton.style.display="block";
}


function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex <question.length){
    showQuestion();
  }else{
    showScore();
  }
}


nextButton.addEventListener("click",()=>{
  if(currentQuestionIndex < question.length){
    handleNextButton();


    }else{
      startQuiz();
    }
  
});
startQuiz();