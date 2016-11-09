var QuizApp = function(){
  var questionStore = {
    id1: {
      questionText: "How are you?",
      responses:[{
        responseText: "Not so well.",
        next: "id2",
      },{
        responseText: "I'm doing fine.",
        next: "id4",
      }],
    },
    id4: {
      questionText: "And what are you going to do today?",
      responses:[{
        responseText: "Work.",
        next: "id5",
      },{
        responseText: "Make music.",
        next: "id3",
      }],
    },
  }
  var exitStore = {
    id2: {
      exitText: "Wrong answer buster 2."
    },
    id5: {
      exitText: "Wrong answer buster 5."
    },
  }
  var signupStore = {
    id3: {
      signupText: "We agree that ... Sign the petition"
    }
  }
  var viewTypes = {
    id1: "question",
    id4: "question",
    id5: "exit",
    id2: "exit",
    id3: "signup",
  }
  var updates = {
    "question": updateQuestion,
    "exit": updateExit,
    "signup": updateSignup,
  }
  var stores = {
    "question": questionStore,
    "exit": exitStore,
    "signup": signupStore,
  }
  var containerDivs = {
    "question": document.getElementById("quizzApp-question-view"),
    "exit": document.getElementById("quizzApp-exit-view"),
    "signup": document.getElementById("quizzApp-signup-view"),
  }

  var updateHandlers = Object.keys(viewTypes).reduce(function(accum,viewId){
    accum[viewId] = function(){update(viewId)};
    return accum;
  },{})

  function createElement(tagName, className, attributes){
    var newElement = document.createElement(tagName);
    if(className){
      newElement.classList.add(className);
    }
    if(attributes){
      attributes.forEach(function(attr){
        newElement.setAttribute(attr.key, attr.value);
      });
    }
    return newElement;
  }

  function updateQuestion(question){
    // creates questionText element
    // sets innerHTML of question view
    var qT = question.questionText;
    var qTEl = createElement("p","question-text");
    qTEl.innerHTML = qT;
    var qTContainer = createElement("div", "question-text-container");
    qTContainer.appendChild(qTEl);
    // creates responses element
    var res = question.responses;
    var resContainer = document.createElement("div");
    resContainer.classList.add("responses-container");
    var resEl;
    for (var i = 0; i < res.length; i++){
      var nextView = res[i].next;
      var rT = res[i].responseText
      var attrs = [["type","button"],["data-next",res[i].next]];
      resEl = createElement("button","response-button",attrs);
      resEl.setAttribute("type","button");
      resEl.setAttribute("data-next", nextView);
      resEl.innerHTML = rT;
      resEl.addEventListener("click",updateHandlers[nextView]);
      resContainer.appendChild(resEl);
    }
    var questionWrapper = createElement("div", "question-wrapper");
    questionWrapper.appendChild(qTContainer);
    questionWrapper.appendChild(resContainer);
    var oldQ = containerDivs.question.children[0];
    if(oldQ){
      containerDivs.question.removeChild(oldQ);
    }
    containerDivs.question.appendChild(questionWrapper);
  }

  function updateExit(exit){
    var eT = exit.exitText;
    var eTEl = createElement("p","question-text");
    eTEl.innerText = eT;
    var eTContainer = createElement("div", "exit-text-container");
    eTContainer.appendChild(eTEl);
    var exitWrapper = createElement("div", "exit-wrapper");
    exitWrapper.appendChild(eTContainer);
    containerDivs.exit.appendChild(exitWrapper);
  }

  function updateSignup(){
  }

  function updateClasses(viewType){
    Object.keys(containerDivs).forEach(function(key){
      containerDivs[key].classList.remove("active");
    });
    containerDivs[viewType].classList.add("active");
  }

  function update(viewId){
    var viewType = viewTypes[viewId];
    updateClasses(viewType);
    var storeData = stores[viewType][viewId];
    updates[viewType](storeData);
  }

  function init(){
    // perform update on initial view
    update("id1");
  }

  return {
    init: init,
  }
}

var quizApp = QuizApp();
quizApp.init();