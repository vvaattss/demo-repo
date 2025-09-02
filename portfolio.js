//TASK 1 - Admin Login Button should bring back Admin login section

let controlOfAdminLogin = document.getElementById("admin-login");

function showAdminLogin() {
  controlOfAdminLogin.style.display = "block";
}

//TASK 2 - MAKE TOGGLE BUTTON WORK
let controlOfThemeBtn = document.getElementById("switch-theme");

controlOfThemeBtn.addEventListener('click', function(){
document.body.classList.toggle("dark-theme");
});

//TASK 3 - Make your Admin Login work.
let controlOfAdminForm = document.getElementById("admin-form");

controlOfAdminForm.addEventListener('submit', function(e){
  e.preventDefault();
  let storedUsername = "admin";
  let storedPassword =  "password";
  
  let username = document.getElementById("usrnme").value;
  let password = document.getElementById("pwd").value;
  
  //LOGIC GATES?? (AND OR NOT)
  //AND - BOTH conditions SHOULD be TRUE -> TRUE SYMBOL -> &&
  //OR - Even if ONE condition is TRUE -> TRUE SYMBOL -> ||
  //NOT - INVERT your decision SYMBOL -> !
  // 2 equal signs 1 with "1" -> TRUE
  //3 equal signs 1 with "1" -> FALSE
  if (storedUsername == username && storedPassword == password) {
    alert("Welcome Admin!");
    
    document.getElementById("admin-login").style.display = "none";
    document.getElementById("user-responses").style.display = "block";
    
    //Call the function which will get user response from the backend in JSON format
    // and display them one by one
    displayUserMessages();
  }
  else {
    alert("Access denied!!");
  }
});

//TASK 4 - Store user response from the contact me section in a backend(Chrome LocalStorage)

let controlOfContactmeForm = document.getElementById("contact-me-form");

controlOfContactmeForm.addEventListener('submit', function(e){
  e.preventDefault();
  
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("msg").value;
  let date = new Date().toLocaleString(); //We are getting the date from the system
  
  //Convert these into an Object- Response Object 
  //Why? so we can send it to the backend
  //and to keep a standard way of storing this data.
  
  let response = {
    name, email, message, date
  }
  
 
  
  //Once you run this code for the first time, you will create a Dummy DB in the LocalStorage , every other time there is no need to create it again.
   
  
  //JSON.parse converts JSON structure to JAVASCRIPT Object (Getting data from DB), DB sends you data in JSON format.
  
  //JSON.stringify convert JAVASCRIPT Object to JSON (Sending data from JS to DB, need to converted to JSON)
  let DummyDatabase = JSON.parse(localStorage.getItem('tempDB')) || [ ]; //This will act like or Dummy Database (Actually a list that will be stored in the LocalStorage of Chrome Browser)
  
  //This is how we put item in a JS LIST
  DummyDatabase.push(response) // This still works on JS
  
  
  
  //This is where the tempDB list will go to the backend and start acting as our DummyDatabase.
  localStorage.setItem('tempDB', JSON.stringify(DummyDatabase));
  alert("Thank you for your message, will get back to you shortly!");
  this.reset();
});


function displayUserMessages(){
  //get all responses from the dummy database and show them in the UI on user responses section(After admin login has correct creds.)
  let ControlOfUserMessages = document.getElementById("user-messages");
  
  let DummyDatabase = JSON.parse(localStorage.getItem('tempDB')) || [ ];
  
  DummyDatabase.forEach(response=>{
    let ControlOfResponseElement = document.createElement('div');
    
    ControlOfResponseElement.innerHTML = `
    <p> Name: ${response.name} </p>
    <p> Email: ${response.email} </p>
    <p> Message: ${response.message} </p>
    <p> Date: ${response.date} </p>
    <hr>
    `
    ControlOfUserMessages.append(ControlOfResponseElement);
  });
}