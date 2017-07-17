$(document).ready(function() {
  var check = localStorage.getItem('token');
  
  if (check) {
    console.log('true');
  } else {
    console.log('false');
  }
  
  console.log(window.location.href);
  
  // See services/Menu.services
  menus();
  
  // See services/User.services
  users();
  
  // See quiz/quiz.js
  quiz();
  
  // See services/Questions.services
  questions();
  
  // See services/Quotes.services
  quotes();
  
  // See services/Results.services
  results();
  
  
});