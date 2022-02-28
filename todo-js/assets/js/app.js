// DOM
const todoInput = document.querySelector(".todo-input");
const todoPen = document.querySelector(".todo-pen");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const errorTXT = document.querySelector("p");

// Tapahtuma käsittelijät
document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", manageTodos);

function createTask(event) {
   // JOS todo-inputin teksti on pienempi kuin yksi
   if (todoInput.value < 1) {
      errorTXT.textContent = "Your input is too short.";
      setTimeout(() => {
         errorTXT.textContent = "";
      }, 2000);
   }
   // MUUTEN kutsutaan funktio
   else {
      addTodo();
   }
}

function addTodo(event) {
   // Ohjelma kertoo mitä käyttäjä on lisännyt viimeiseksi todolistaan
   errorTXT.textContent = "Added to list: " + todoInput.value;

   // Tyhjennetään tieto mitä ohjelma on kertonut 4000 millisekunnin päästä
   setTimeout(() => {
      errorTXT.textContent = "";
   }, 4000);

   // Luodaan muuttuja
   const todoDiv = document.createElement("div");
   todoDiv.classList.add("todo");

   const newTodo = document.createElement("li"); // Luodaan lista elementti
   newTodo.innerText = todoInput.value; // Listan nimi

   newTodo.classList.add("todo-item"); // lisätään li elemnttiin todo-item class
   todoDiv.appendChild(newTodo); // Lisätään todoDivin sisälle uusi child elementti joka on newTodo elementti

   // ADD TODO TO LOCALSTORAGE
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

function manageTodos(e) {
   // Haetaan joka ikisen itemin arvo jota klikataan .todo-list sisällä
   const item = e.target;

   // JOS itemin classlistissä ei ole mitään niin item saa classin delete-btn
   if (item.classList[0] === "delete-btn") {
      // Luodaan uusi muuttuja joka on item parentelementti
      const todo = item.parentElement;

      removeLocalTodos(todo);
      // Lisätään classlist transition
      todo.classList.add("transition");
      todo.style.backgroundColor = "#b07a83";
      todo.style.color = "white";

      // Käytetään setTimeout funktiota jonka avulla voimme odottaa {1000ms = 3s}
      setTimeout(() => {
         todo.remove();
      }, 1000);
   }

   if (item.classList[0] === "complete-btn") {
      // Luodaan uusi muuttuja joka on itemin parentelementti eli div.todo
      const todo = item.parentElement;

      todo.classList.toggle(completeLocalTodos(todo));
   }

   if (item.classList[0] === "edit-btn") {
      // Luodaan uusi muuttuja joka on itemin parentelementti eli div.todo
      const todo = item.parentElement;

      // editLocalTodos(todo)

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
         errorTXT.textContent = "Name has been changed from " + item.textContent + " to " + todoInput.value;

         // Muutetaan arvoa eli itemin uusi arvo on nyt syöte johon käyttäjä syöttää uuden nimen
         item.textContent = todoInput.value;

         // Käytetään setTimeout funktiota jonka avulla voimme odottaa {3000ms = 3s}
         setTimeout(() => {
            errorTXT.textContent = "";
            todoInput.value = "";
         }, 3000);
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

   // JOS todo ei ole olemassa
   if (localStorage.getItem("todos") === null) {
      todos = [];
   }
   // JOS todo on jo olemassa
   else {
      todos = JSON.parse(localStorage.getItem("todos")); // Haetaan todos localstoragesta
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

function completeLocalTodos(todo, undefined) {
  // Luodaan muuttujia
  let todos;
  let hasCompleted = false;

  // JOS localstoragessa ei ole mitään
  if (localStorage.getItem("todos") === null) {
     todos = [];
  }
  // JOS localstoragessa on jotain
  else {
     todos = JSON.parse(localStorage.getItem("todos")); // Haetaan todos localstoragesta
  }

  // Suoritetaan toimintoja localstoragen sisalla
  localStorage.setItem("todosCompleted", (hasCompleted));
  todo.classList.toggle("completed");

  console.log("Parent Element:", todo);
  console.log("Local Storage: ", todos);
}

function removeLocalTodos(todo) {
   // Luodaan uusi muuttuja
   let todos;

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

/* function editLocalTodos(todo) {
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

  // Haetaan indexia klikatusta elementistä
  const todoIndex = todo.children[0].innerText;
  console.log(todoIndex)

  // Kerrotaan localstoragelle tapahtuneet muutokset
  localStorage.setItem("todos", JSON.stringify(todoIndex));
  console.log(todoIndex)
} */
