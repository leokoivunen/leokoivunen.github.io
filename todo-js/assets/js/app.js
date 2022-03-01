// DOM
const todoInput = document.querySelector(".todo-input");
const todoPen = document.querySelector(".todo-pen");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const errorTXT = document.querySelector("p");
let taskCompleted;

// Tapahtuma käsittelijät
document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", createTask);
todoList.addEventListener("click", manageTodos);

function createTask(event) {
   if (todoInput.value < 1) {
      // jos syötteen teksti on pienempi kuin yksi
      errorTXT.textContent = "Your input is too short.";
      setTimeout(() => {
         errorTXT.textContent = "";
      }, 2000);
   } else {
      addTodo();
   } // kutsutaan funktiota
}

function addTodo(event) {
   // tulostetaan se mitä käyttäjä lisäsi listaan
   errorTXT.textContent = "Added to list: " + todoInput.value;

   // odotetaan 4000 ms ja sit tehdään jotain
   setTimeout(() => {
      errorTXT.textContent = "";
   }, 4000);

   // luodaan uusi div
   const todoDiv = document.createElement("div");
   todoDiv.classList.add("todo"); // lisätään diviin class: todo

   // luodaan uusi lista
   const newTodo = document.createElement("li");
   newTodo.innerText = todoInput.value; // listan nimi
   newTodo.classList.add("todo-item"); //lisätään listaan class: todo-item

   // lisätään divin sisälle uusi child elementti joka on lista elementti
   todoDiv.appendChild(newTodo);

   // tallenetaan syöte localstorageen
   saveLocalTodos(todoInput.value);

   // Hallinta nappulat
   const editBtn = document.createElement("button"); // luodaan edit nappula
   editBtn.innerHTML = '<i class="fas fa-pen"></i>'; // lisätään nappulan sisälle oma iconi
   editBtn.classList.add("edit-btn"); // Lisätään nappulan elementtiin complete-btn class
   todoDiv.appendChild(editBtn); // Lisätään todoDivin sisälle uusi child elementti joka on editBtn elementti

   const completeBtn = document.createElement("button"); // Luodaan complete nappula
   completeBtn.innerHTML = '<i class="fas fa-check"></i>'; // lisätään nappulan sisälle oma iconi
   completeBtn.classList.add("complete-btn"); // Lisätään nappulan elementtiin complete-btn class
   todoDiv.appendChild(completeBtn); // Lisätään todoDivin sisälle uusi child elementti joka on completeBtn elementti

   const deleteBtn = document.createElement("button"); // Luodaan delete nappula
   deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'; // lisätään nappulan sisälle oma iconi
   deleteBtn.classList.add("delete-btn"); // Lisätään nappulan elementtiin delete-btn class
   todoDiv.appendChild(deleteBtn); // Lisätään todoDivin sisälle uusi child elementti joka on deleteBtn elementti

   todoList.appendChild(todoDiv); // Näytetään html nettisivulla todoDiv joka sisältää kaikki elementit
   todoInput.value = ""; // Tyhjennetään syöte teksti kun lisätään uusi objekti listaan
}

function manageTodos(event) {
   // haetaan joka ikisen elementin arvo jota klikataan .todo-list sisällä ja alusteaan se muuttujaksi item
   const item = event.target;

   // jos itemin classlistissä ei ole mitään niin item saa classin delete-btn
   if (item.classList[0] === "delete-btn") {
      // luodaan uusi muuttuja joka on item parentelementti
      const todo = item.parentElement;

      // poistetaan todo
      removeLocalTodos(todo);

      // lisätään classlist transition
      todo.classList.add("transition");
      todo.style.backgroundColor = "#b07a83";
      todo.style.color = "white";

      // odotetaan 1000 ms ja sit tehdään jotain
      setTimeout(() => {
         todo.remove(); // poistetaan todo
      }, 1000);
   }

   if (item.classList[0] === "complete-btn") {
      taskCompleted = !taskCompleted;

      const todo = item.parentElement;

      console.log(taskCompleted);

      todo.classList.toggle("completed");

      todo.classList.toggle(completeLocalTodos(todo));
   }

   if (item.classList[0] === "edit-btn") {
      // luodaan uusi muuttuja joka on item parentelementti
      const todo = item.parentElement;

      // Kerrotaan käyttäjälle että muokkaamme nimeä
      errorTXT.textContent = "Rename task ...";

      // Tallanetaan taskin nimi ja syötetään se inputtiin
      todoInput.value = todo.innerText;

      // Muotoillaan nappuloita
      todoButton.style.display = "none";
      todoPen.style.display = "block";

      // Kun klikataan kynää niin kutsutaan funktio joka tekee muutokset
      todoPen.onclick = function () {
         // Muotoillaan nappuloita
         todoPen.style.display = "none";
         todoButton.style.display = "block";

         // Haetaan todon children eli lista elementti
         let item = todo.children[0];

         // Asetetetaan errortekstiin entinen arvo ja muutettu arvo
         errorTXT.textContent =
            "Name has been changed from " +
            item.textContent +
            " to " +
            todoInput.value;

         // Muutetaan arvoa eli itemin uusi arvo on nyt syöte johon käyttäjä syöttää uuden nimen
         item.textContent = todoInput.value;

         // Käytetään setTimeout funktiota jonka avulla voimme odottaa {3000ms = 3s}
         setTimeout(() => {
            errorTXT.textContent = "";
            todoInput.value = "";
         }, 3000);

         localStorage.setItem("todos", JSON.stringify([item.textContent]));

      };
   }
}

function saveLocalTodos(todo) {
   // Luodaan uusi muuttuja
   let todos;

   // JOS todo ei ole olemassa
   if (localStorage.getItem("todos") === null) {
      todos = [];
   }
   // JOS todo on jo olemassa
   else {
      todos = JSON.parse(localStorage.getItem("todos")); // Haetaan todos localstoragesta
   }

   // JOS meillä on array niin sitten otetaan tieto eli todo joka on tässä tapauksessa inputti ja pusketaan se todos sisään eli localstorageen
   todos.push(todo);

   // Pusketaan todos takaisin localstorageen
   localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
   // Luodaan uusi muuttuja
   let todos;
   let completed;

   // JOS todo ei ole olemassa
   if (localStorage.getItem("todos") === null) {
      todos = [];
      completed = [];
   }
   // JOS todo on jo olemassa
   else {
      todos = JSON.parse(localStorage.getItem("todos")); // Haetaan todos localstoragesta

      completed = JSON.parse(localStorage.getItem("completed-task"));
   }

   // Foreach loopataan localstorage läpi
   todos.forEach(function (todo) {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");

      const newTodo = document.createElement("li");
      newTodo.innerText = todo;

      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);

      // Hallinta nappulat
      const editBtn = document.createElement("button");
      editBtn.innerHTML = '<i class="fas fa-pen"></i>';
      editBtn.classList.add("edit-btn");
      todoDiv.appendChild(editBtn);

      const completeBtn = document.createElement("button");
      completeBtn.innerHTML = '<i class="fas fa-check"></i>';
      completeBtn.classList.add("complete-btn");
      todoDiv.appendChild(completeBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
      deleteBtn.classList.add("delete-btn");
      todoDiv.appendChild(deleteBtn);
      todoList.appendChild(todoDiv);
   });
}

function completeLocalTodos(todo) {
   // Luodaan muuttujia
   let todos;
   let completed;

   // JOS localstoragessa ei ole mitään
   if (localStorage.getItem("todos") === null) {
      todos = [];
      completed = [];
   }
   // JOS localstoragessa on jotain
   else {
      todos = JSON.parse(localStorage.getItem("todos"));

      completed = JSON.parse(localStorage.getItem("completed-task"));
   }

   // Suoritetaan toimintoja localstoragen sisalla
   localStorage.setItem("todos_completed", taskCompleted);
}

function removeLocalTodos(todo) {
   // Luodaan uusi muuttuja
   let todos;
   let completed;
   // luodaan rayyaa.
   // JOS localstoragessa ei ole mitään
   if (localStorage.getItem("todos") === null) {
      todos = [];
   }
   // JOS localstoragessa on jotain
   else {
      todos = JSON.parse(localStorage.getItem("todos")); // Haetaan todos localstoragesta
   }

   // Haetaan indexia klikatusta elementistä
   const todoIndex = todo.children[0].innerText;

   // Tutkitaan array ja haetaan index mikä halutaan poistaa
   todos.splice(todos.indexOf(todoIndex, 1));

   // Kerrotaan localstoragelle tapahtuneet muutokset
   localStorage.setItem("todos", JSON.stringify(todos));
}
