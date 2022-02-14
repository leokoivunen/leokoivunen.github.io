import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

// Get localstorage from list
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  // If your list exists we want to return JSON
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  }
  // If list doesnt exist
  else {
    return []
  }
}

function App() {
  // For the form
  const [name, setName] = useState('');

  // For the list using LocalStorage
  const [list, setList] = useState(getLocalStorage());

  // Flag if we are editing or not
  const [isEditing, setIsEditing] = useState(false);

  // For edit ID (which item we are actually editing) by default its going to be null
  const [editID, setEditID] = useState(null);

  // For alert using object if show is true then alert will show but if its false by default
  // it will be hidden until we trigger the alert function
  const [alert, setAlert] = useState({show: false, message: '', type: '' });

  // For handling our submit event
  const handleSubmit = (event) => {
    event.preventDefault()

    // If value is empty 
    if (!name) {
      //  display alert
      showAlert(true, "danger", "Please enter value!")
    }

    // If name there is something in name | If im editing
    else if (name && isEditing) {
      //  deal with edit
      setList(list.map((item) => {
        if (item.id === editID) {
         return {...item, title: name } 
        }
        return item
      }))
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'Edit completed!')
    }

    else {
      showAlert(true, "success", "Item added to the list!")
      // if everything is correct and I have some kind of value in name and Im not editing
      // Create new item with 2 properties (id, title)
      const newItem = {id: new Date().getTime().toString(), title: name};

      // Get previous list values [...] and add new item
      setList([...list, newItem]); 

      // Set name to empty string because when we add new item we want to clear the input automatically
      setName('');
    }
  }

  // create arrow function ShowAlert
  const showAlert = (show = false, type = "", message = "") => {
    setAlert({show, type, message})
  }

  // create arrow function clearList
  const clearList = () => {

    // Trigger function and set values
    showAlert(true, "danger", "Empty list!");

    // Set list = to empty array
    setList([])
  }

  // create arrow function removeItem
  const removeItem = (id) => {
    showAlert(true, "danger", "Item removed!");
    setList(list.filter((item) => item.id !== id))
  }

  // create arrow function ediItem and we are looking for id
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id)
    setName(specificItem.title)
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])

  // Use section and center the section then display the list
  return (
  <section className="section-center">
    <form className="grocery-form" onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={showAlert} />}
      <h3>grocery bud</h3>
      <div className="form-control">
        <input type="text" className="grocery" placeholder="e.g eggs" 
        value={name} onChange={(event) => setName(event.target.value) } />
        <button type="submit" className="submit-btn">
          {isEditing ? "editing": "submit"}
        </button>
      </div>
    </form>
    {list.length > 0 && (
      <div className="grocery-conatiner">
      <List items={list} removeItem = {removeItem} editItem = {editItem} />
      <button className="clear-btn" onClick={clearList}>clear items</button>
    </div>
    )}
  </section>
  )
}

export default App