// Alustetaan html elementit muuttujiksi
let todoInput = document.querySelector(".todo-input");
let todoPen = document.querySelector(".todo-pen");
let todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const errorTXT = document.querySelector("p");

// Kun klikkaamme nappulaa kutsumme funktiota
todoButton.addEventListener("click", addTodo);

function addTodo() {
  // JOS todo-inputin teksti on pienempi kuin yksi niin tulostetaan...
  if (todoInput.value < 1) {
    errorTXT.textContent = "Your input is too short.";
  } else {
    createTask();
  }

  function createTask() {
    // Luodaan muuttuja joka kertoo että mikä elementti on lisätty todo listaan
    errorTXT.textContent = "Added to list: " + todoInput.value;

    // Asyncia varten
    function sleep(milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

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

    // Tyhjennetään inputin teksti kun nappulaa painetaan
    todoInput.value = "";
  }
}
