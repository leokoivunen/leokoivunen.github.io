// Alustetaan html elementit muuttujiksi
let todoInput = document.querySelector(".todo-input");
let todoPen = document.querySelector(".todo-pen");
let todoButton = document.querySelector(".todo-button");
let todoList = document.querySelector(".todo-list");
let errorTXT = document.querySelector("p");

// Lisätään async timer
function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// Kun klikkaamme nappulaa kutsutaan functio ...
todoButton.addEventListener("click", addTodo);

function addTodo(event) {
  if (todoInput.value < 1) { // JOS todo-inputin teksti on pienempi kuin yksi niin tulostetaan...
    errorTXT.textContent = "Your input is too short.";
    setTimeout(() => {
      errorTXT.textContent = "";
    }, 4000);
  }
  else { // MUUTEN kutsutaan functio
    createTask();
  }

  function createTask() {

    errorTXT.textContent = "Added to list: " + todoInput.value; // Mitä käyttäjä on lisännyt todolistaan

    const todoDiv = document.createElement("div"); // Luodaan div elementti
    todoDiv.classList.add("todo"); // Lisätään div elementtiin todo class

    const newTodo = document.createElement("li"); // Luodaan lista elementti
    newTodo.innerText = todoInput.value; // Listan nimi
    newTodo.classList.add("todo-item"); // Listään li elemnttiin todo-item class
    todoDiv.appendChild(newTodo); // Lisätään todoDivin sisälle uusi child elementti joka on newTodo elementti


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

/*     function editBtn() {
      // Kun painetaan suoritettu nappulaa kutsutaan funktiota
      editBtn.addEventListener("click", editTask);
      async function editTask() {
        // Muokataan taskia
        errorTXT.textContent = "Editing task name...";

        // Asetetaan nappula buttoni pois näkyvistä
        todoButton.style.display = "none";

        // Annetaan todoinputille meidän tehtävän arvo
        todoInput.value = newTodo.innerText;

        // Asetetaan edit buttoni näkyviin
        todoPen.style.display = "block";

        // Annetaan edit buttonille iconi
        todoPen.innerHTML = '<i class="fas fa-pen"></i>';

        // Kun klikkaamme nappulaa niin luomme function joka tekee nämä asiat...
        todoPen.onclick = async function () {
          // Muokataan taskia
          errorTXT.textContent = "Name has been changed from " + newTodo.innerText + " to " + todoInput.value;
          await sleep(1500);
          errorTXT.textContent = "";

          // Piilotetaan edit kynä ja otetaan + button takaisin näkyviin
          todoPen.style.display = "none";
          todoButton.style.display = "block";

          // Annetaan taskille meidän uusi kirjoittama arvo
          newTodo.textContent = todoInput.value;

          // Tyhjennetään inputin teksti kun nappulaa painetaan
          todoInput.value = "";
        };
      }
    }

    function completeBtn() {
      completeBtn.addEventListener("click", completeTask);
      async function completeTask() {
        // Asetetaan tyylejä
        todoDiv.classList.add("transition");
        todoDiv.style.backgroundColor = "#a3b09a";
        todoDiv.style.color = "white";

        await sleep(1000);
      }
    }

    function deleteBtn() {
      deleteBtn.addEventListener("click", deleteItem);

      async function deleteItem() {
        // Asetetaan tyylejä
        todoDiv.classList.add("transition");
        todoDiv.style.backgroundColor = "#b07a83";
        todoDiv.style.color = "white";
        
        // Poistetaan todoDiv 1000 millisekunnin jälkeen
        await sleep(1000);
        todoDiv.style.display = "none";
        console.log(todoDiv)
      }
    } */
  }
}