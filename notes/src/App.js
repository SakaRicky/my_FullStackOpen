import React, { useState, useEffect } from 'react';
import noteService from './services/notes';
import loginServices from './services/login'

import Note from './components/Note';
import Notification from './components/Notification';
import LoginForm from './components/login_form'
import NoteForm from './components/note_form'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
    </div>
  )
}

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState(
        'a new note...'
      );
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    useEffect(() => {
      noteService
        .getAll()
        .then(initialNotes => {
          setNotes(initialNotes)
        })
    }, [])

    useEffect(() => {
      const loggedNoteappUser = window.localStorage.getItem('loggedNoteappUser')
      if (loggedNoteappUser) {
        const user = JSON.parse(loggedNoteappUser)
        setUser(user)
        noteService.setToken(user.token)
      }
    }, [])

    
    const addNote = (event) => {
        event.preventDefault();
        const noteToAdd = {
            content: newNote,
            date: new Date(),
            important: Math.random() < 0.5
        }
        // setNotes([...notes, noteToAdd]);
        // setNewNote('');

        noteService
          .create(noteToAdd)
          .then(addedNote => {
          setNotes(notes.concat(addedNote));
          setNewNote('');
        })
      }
    
    const handleLogin = async (event) => {
      event.preventDefault()
      
      try {
        const user = await loginServices.login({
          username: username,
          password: password
        })

        window.localStorage.setItem(
          'loggedNoteappUser', JSON.stringify(user)
        )
        noteService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
      } catch (error) {
        setErrorMessage('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      }
    }
    
    const handleNoteChange = (event) => {
      setNewNote(event.target.value);
    }

    const handleUsernameChange = (event) => {
      setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
      setPassword(event.target.value)
    }

    const toToggleImportance = (id) => {
      const note = notes.find(note => note.id === id);
      const changedNote = {...note, important: !note.important}
      
      noteService
        .update(id, changedNote)
        .then(updatedNote => {
          setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note))
        })
        .catch(error => {
          setErrorMessage(
            `The note ${note.content} was already deleted from the server`
          )
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setNotes(notes.filter(note => note.id !== id))
        })
      
    }

    return (
      <div>
        <h1>Notes</h1>
        <Notification message={errorMessage} />

        {user === null ? <LoginForm 
                              handleLogin={handleLogin} 
                              username={username} 
                              password={password} 
                              usernameChange={handleUsernameChange} 
                              passwordChange={handlePasswordChange}
                          /> : 
          <div>
            <p>{user.name} is logged-in</p>
            <NoteForm 
                newNote={newNote}
                handleNoteChange={handleNoteChange} 
                addNote={addNote}
            />
          </div>}
        
        <div>
            <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'important' : 'all' }
            </button>
      </div>
        <ul>
          {notesToShow.map(note => 
                                <Note 
                                    key={note.id} 
                                    note={note} 
                                    toggleImportance={() => toToggleImportance(note.id)} 
                                />)}
        </ul>
      <Footer />
      </div>
    )
  }
  
export default App;