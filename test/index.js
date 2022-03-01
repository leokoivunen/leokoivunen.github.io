let button = document.querySelector("button")

let testBool = true;
console.log('Default value of bool is', testBool);

button.addEventListener("click", () => {
    testBool = !testBool;
              
    console.log('Toggled bool is', testBool);
    
})