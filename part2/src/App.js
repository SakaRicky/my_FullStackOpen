import React, { useState } from 'react'
import Note from './components/Note'

const App = ({ notes }) => {
  const [notes, setNotes] = useState(notes);
  const [newNote, setNewNote] = useState(
    'a new note ...'
  )

  const addNote = (event) => {
    event.preventDefault()
    console.log("Button clicked", event.target);
  }
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => 
          <Note key={note.id} note={note} id={note.id} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote}/>
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App