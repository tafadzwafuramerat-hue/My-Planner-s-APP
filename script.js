

const pages = document.querySelectorAll(".page");
const nav = document.getElementById("nav");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let note = localStorage.getItem("note") || "";

function toggleMenu(){

nav.classList.toggle("show");

}

function showPage(page){

pages.forEach(function(section){

section.classList.remove("active");

});

document.getElementById(page).classList.add("active");

}

function updateClock(){

let now = new Date();

document.getElementById("todayDate").textContent =
now.toDateString();

document.getElementById("clock").textContent =
now.toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();

function saveTasks(){

localStorage.setItem("tasks",JSON.stringify(tasks));

}

function addTask(){

let input = document.getElementById("taskInput");

let text = input.value.trim();

if(text===""){

alert("Enter a task");

return;

}

let task={

text:text,

done:false

};

tasks.push(task);

input.value="";

saveTasks();

displayTasks();

}

function displayTasks(){

let list=document.getElementById("taskList");

list.innerHTML="";

let completed=0;

tasks.forEach(function(task,index){

if(task.done){

completed++;

}

let li=document.createElement("li");

let span=document.createElement("span");

span.textContent=task.text;

if(task.done){

span.classList.add("done");

}

let buttons=document.createElement("div");

buttons.className="actions";

let complete=document.createElement("button");

complete.className="complete";

complete.textContent="Done";

complete.onclick=function(){

task.done=!task.done;

saveTasks();

displayTasks();

};

let edit=document.createElement("button");

edit.textContent="Edit";

edit.onclick=function(){

let newTask=prompt("Edit Task",task.text);

if(newTask){

task.text=newTask;

saveTasks();

displayTasks();

}

};

let remove=document.createElement("button");

remove.className="delete";

remove.textContent="Delete";

remove.onclick=function(){

tasks.splice(index,1);

saveTasks();

displayTasks();

};

buttons.appendChild(complete);

buttons.appendChild(edit);

buttons.appendChild(remove);

li.appendChild(span);

li.appendChild(buttons);

list.appendChild(li);

});

document.getElementById("totalTasks").textContent=tasks.length;

document.getElementById("completedTasks").textContent=completed;

document.getElementById("pendingTasks").textContent=
tasks.length-completed;

let percent=0;

if(tasks.length>0){

percent=Math.round((completed/tasks.length)*100);

}

document.getElementById("progressBar").style.width=
percent+"%";

document.getElementById("progressText").textContent=
percent+"% Completed";

}

function saveNote(){

let text=document.getElementById("noteInput").value;

note=text;

localStorage.setItem("note",text);

document.getElementById("savedNote").textContent=text;

updateDashboard();

}

function clearNote(){

document.getElementById("noteInput").value="";

document.getElementById("savedNote").textContent="";

localStorage.removeItem("note");

note="";

updateDashboard();

}

function loadNote(){

document.getElementById("noteInput").value=note;

document.getElementById("savedNote").textContent=note;

}

function updateDashboard(){

let total=tasks.length;

let completed=0;

tasks.forEach(function(task){

if(task.done){

completed++;

}

});

document.getElementById("totalTasks").textContent=total;

document.getElementById("completedTasks").textContent=completed;

document.getElementById("pendingTasks").textContent=total-completed;

if(note.trim()==""){

document.getElementById("totalNotes").textContent=0;

}

else{

document.getElementById("totalNotes").textContent=1;

}

}

function createCalendar(){

let today=new Date();

let year=today.getFullYear();

let month=today.getMonth();

let monthNames=[
"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December"
];

document.getElementById("monthTitle").textContent=
monthNames[month]+" "+year;

let grid=document.getElementById("calendarDays");

grid.innerHTML="";

let firstDay=new Date(year,month,1).getDay();

let totalDays=new Date(year,month+1,0).getDate();

for(let i=0;i<firstDay;i++){

let empty=document.createElement("div");

empty.className="day";

grid.appendChild(empty);

}

for(let i=1;i<=totalDays;i++){

let day=document.createElement("div");

day.className="day";

day.textContent=i;

if(i===today.getDate()){

day.classList.add("today");

}

grid.appendChild(day);

}

}

window.onload=function(){

displayTasks();

loadNote();

updateDashboard();

createCalendar();

updateClock();

}