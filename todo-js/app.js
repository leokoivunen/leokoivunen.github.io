// Alustetaan html elementit muuttujiksi
let todoInput = document.querySelector(".todo-input");
let todoPen = document.querySelector(".todo-pen");
let todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const errorTXT = document.querySelector("p");

// Async timer
function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// Kun DOM lataa niin suoritetaan seuraava koodi
// document.addEventListener("DOMContentLoaded", getTodos);

// Kun klikkaamme nappulaa kutsumme funktiota
todoButton.addEventListener("click", addTodo);

async function addTodo() {

  // JOS todo-inputin teksti on pienempi kuin yksi niin tulostetaan...
  if (todoInput.value < 1) {
    errorTXT.textContent = "Your input is too short.";
    await sleep(3000);
    errorTXT.textContent = "";
  }
  // MUUTEN kutsutaan funktiota
  else {
    createTask();
  }

  async function createTask() {
    
    // Luodaan muuttuja joka kertoo että mitkä elementit on lisätty todo listaan
    errorTXT.textContent = "Added to list: " + todoInput.value;
    await sleep(500);
    errorTXT.textContent = "";

    
    // Luodaan div
    const todoDiv = document.createElement("div");
    // Lisätään div elementtiin todo class
    todoDiv.classList.add("todo");

    
    // Luodaan lista
    const newTodo = document.createElement("li");
    // Listan nimi
    newTodo.innerText = todoInput.value;
    // Listään li elemnttiin todo-item class
    newTodo.classList.add("todo-item");
    // Lisätään divin sisälle uusi child elementti joka on li elementti
    todoDiv.appendChild(newTodo);


    // Luodaan localstorage
    // saveLocalTodos(todoInput.value);

    
    function editBtn() {
      const editBtn = document.createElement("button");
      // lisätään nappulan sisälle oma iconi
      editBtn.innerHTML = '<i class="fas fa-pen"></i>';
      // Lisätään button elementtiin complete-btn class
      editBtn.classList.add("edit-btn");
      // Lisätään divin sisälle uusi child elementti joka on button elementti
      todoDiv.appendChild(editBtn);
      // Kun painetaan suoritettu nappulaa kutsutaan funktiota
      editBtn.addEventListener("click", editTask);
      async function editTask() {
        // Asetetaan + buttoni pois näkyvistä
        todoButton.style.display = "none";

        // Annetaan todoinputille meidän tehtävän arvo
        todoInput.value = newTodo.innerText;

        // Asetetaan edit buttoni näkyviin
        todoPen.style.display = "block";

        // Annetaan edit buttonille iconi
        todoPen.innerHTML = '<i class="fas fa-pen"></i>';

        // Kun klikkaamme nappulaa niin luomme function joka tekee nämä asiat...
        todoPen.onclick = function () {
          // Piilotetaan edit kynä ja otetaan + button takaisin näkyviin
          todoPen.style.display = "none";
          todoButton.style.display = "block";

          // Annetaan taskille meidän uusi kirjoittama arvo
          newTodo.textContent = todoInput.value;

          // Tyhjennetään inputin teksti kun nappulaa painetaan
          todoInput.value = "";
        };
      }
    } editBtn();

    function completeBtn() {
      const completeBtn = document.createElement("button");
      // lisätään nappulan sisälle oma iconi
      completeBtn.innerHTML = '<i class="fas fa-check"></i>';
      // Lisätään button elementtiin complete-btn class
      completeBtn.classList.add("complete-btn");
      // Lisätään divin sisälle uusi child elementti joka on button elementti
      todoDiv.appendChild(completeBtn);
      // Kun painetaan suoritettu nappulaa kutsutaan funktiota
      completeBtn.addEventListener("click", completeTask);
      async function completeTask() {
        // Asetetaan tyylejä
        todoDiv.classList.add("transition");
        todoDiv.style.backgroundColor = "#a3b09a";
        todoDiv.style.color = "white";

        await sleep(1000);
      }
    } completeBtn();
    
    function deleteBtn() {
      const deleteBtn = document.createElement("button");
      // lisätään nappulan sisälle oma iconi
      deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
      // Lisätään button elementtiin complete-btn class
      deleteBtn.classList.add("delete-btn");
      // Lisätään divin sisälle uusi child elementti joka on button elementti
      todoDiv.appendChild(deleteBtn);
      // Kun painetaan roskakori nappulaa kutsutaan funktiota
      deleteBtn.addEventListener("click", deleteItem);

      async function deleteItem() {
        // Asetetaan tyylejä
        todoDiv.classList.add("transition");
        todoDiv.style.backgroundColor = "#b07a83";
        todoDiv.style.color = "white";

        // Poistetaan localstoragesta todos
        // removeLocalTodos(todoDiv);

        // Poistetaan todoDiv 1000 millisekunnin jälkeen
        await sleep(1000);
        todoDiv.style.display = "none";
      }
    } deleteBtn();


    // Näytetään html nettisivulla div
    todoList.appendChild(todoDiv);

    
    // Tyhjennetään inputin teksti kun nappulaa painetaan
    todoInput.value = "";
  }
}

// saveLocalStorage
/* function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Luodaan div
    const todoDiv = document.createElement("div");
    // Lisätään div elementtiin todo class
    todoDiv.classList.add("todo");

    // Luodaan lista
    const newTodo = document.createElement("li");
    // Listan nimi
    newTodo.innerText = todo;
    // Listään li elemnttiin todo-item class
    newTodo.classList.add("todo-item");
    // Lisätään divin sisälle uusi child elementti joka on li elementti
    todoDiv.appendChild(newTodo);

    // Luodaan nappula
    const editBtn = document.createElement("button");
    // lisätään nappulan sisälle oma iconi
    editBtn.innerHTML = '<i class="fas fa-pen"></i>';
    // Lisätään button elementtiin complete-btn class
    editBtn.classList.add("edit-btn");
    // Lisätään divin sisälle uusi child elementti joka on button elementti
    todoDiv.appendChild(editBtn);
    // Kun painetaan suoritettu nappulaa kutsutaan funktiota
    editBtn.addEventListener("click", editTask);
    async function editTask() {
      // Asetetaan + buttoni pois näkyvistä
      todoButton.style.display = "none";

      // Annetaan todoinputille meidän tehtävän arvo
      todoInput.value = newTodo.innerText;

      // Asetetaan edit buttoni näkyviin
      todoPen.style.display = "block";

      // Annetaan edit buttonille iconi
      todoPen.innerHTML = '<i class="fas fa-pen"></i>';

      // Kun klikkaamme nappulaa niin luomme function joka tekee nämä asiat...
      todoPen.onclick = function () {
        // Piilotetaan edit kynä ja otetaan + button takaisin näkyviin
        todoPen.style.display = "none";
        todoButton.style.display = "block";

        // Annetaan taskille meidän uusi kirjoittama arvo
        newTodo.textContent = todoInput.value;

        // Tyhjennetään inputin teksti kun nappulaa painetaan
        todoInput.value = "";
      };
    }

    // Luodaan nappula
    const completeBtn = document.createElement("button");
    // lisätään nappulan sisälle oma iconi
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    // Lisätään button elementtiin complete-btn class
    completeBtn.classList.add("complete-btn");
    // Lisätään divin sisälle uusi child elementti joka on button elementti
    todoDiv.appendChild(completeBtn);
    // Kun painetaan suoritettu nappulaa kutsutaan funktiota
    completeBtn.addEventListener("click", completeTask);
    async function completeTask() {
      // Asetetaan tyylejä
      todoDiv.classList.add("transition");
      todoDiv.style.backgroundColor = "#a3b09a";
      todoDiv.style.color = "white";

      await sleep(1000);
    }

    // Luodaan nappula
    const deleteBtn = document.createElement("button");
    // lisätään nappulan sisälle oma iconi
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    // Lisätään button elementtiin complete-btn class
    deleteBtn.classList.add("delete-btn");
    // Lisätään divin sisälle uusi child elementti joka on button elementti
    todoDiv.appendChild(deleteBtn);
    // Kun painetaan roskakori nappulaa kutsutaan funktiota
    deleteBtn.addEventListener("click", deleteItem);
    async function deleteItem() {
      // Asetetaan tyylejä
      todoDiv.classList.add("transition");
      todoDiv.style.backgroundColor = "#b07a83";
      todoDiv.style.color = "white";
      // Poistetaan todoDiv 1000 millisekunnin jälkeen
      await sleep(1000);
      todoDiv.style.display = "none";
    }

    // Näytetään html nettisivulla div
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
 */