import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  // For the form
  const [name, setName] = useState('');

  // For the list using LocalStorage
  const [list, setList] = useState([]);

  // Flag if we are editing or not
  const [isEditing, setIsEditing] = useState(false);

  // For edit ID (which item we are actually editing) by default its going to be null
  const [editID, setEditID] = useState(null);

  // For alert using object if show is true then alert will show but if its false by default
  // it will be hidden until we trigger the alert function
  const [alert, setAlert] = useState({show: false, message: 'hello world', type: 'success' });

  // For handling our submit event
  const handleSubmit = (event) => {
    event.preventDefault()

    // If value is empty 
    if (!name) {
      //  display alert
    }

    // If name there is something in name | If im editing
    else if (name && isEditing) {
      //  deal with edit
    }

    else {
      // if everything is correct and I have some kind of value in name and Im not editing
      // Create new item with 2 properties (id, title)
      const newItem = {id: new Date().getTime().toString(), title: name};

      // Get previous list values [...] and add new item
      setList([...list, newItem]); 

      // Set name to empty string because when we add new item we want to clear the input automatically
      setName('');
    }
  }

  // Use section and center the section then display the list
  return (
  <section className="section-center">
    <form className="grocery-form" onSubmit={handleSubmit}>
      {alert.show && <Alert/>}
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
      <List items={list} />
      <button className="clear-btn">clear items</button>
    </div>
    )}
  </section>
  )
}

export default App
