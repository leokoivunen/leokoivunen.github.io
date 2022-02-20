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

async function addTodo() {
  
  // JOS todo-inputin teksti on pienempi kuin yksi niin tulostetaan...
  if (todoInput.value < 1) {
    errorTXT.textContent = "Your input is too short.";
    await sleep(1000);
    errorTXT.textContent = "";
  }
  // MUUTEN kutsutaan functio
  else {
    createTask();
  }

  function createTask() {

    // Kerrotaan käyttäjälle mitä käyttäjä on lisännyt todolistaan
    errorTXT.textContent = "Added to list: " + todoInput.value;
    
    // Luodaan div elementti
    const todoDiv = document.createElement("div");
    // Lisätään div elementtiin todo class
    todoDiv.classList.add("todo");

    // Luodaan lista elementti
    const newTodo = document.createElement("li");
    // Listan nimi
    newTodo.innerText = todoInput.value;
    // Listään li elemnttiin todo-item class
    newTodo.classList.add("todo-item");
    // Lisätään divin sisälle uusi child elementti joka on li elementti
    todoDiv.appendChild(newTodo);

    
    function editBtn() {
      // luodaan nappula elementti
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
    
    // Tyhjennetään syöte teksti kun lisätään uusi objekti listaan
    todoInput.value = "";
  }
}