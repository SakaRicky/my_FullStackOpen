import React, { useState, useEffect } from 'react';

import Person from './components/Person';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import phonebookService from './services/phonebook';
import Notification from './components/Notification';
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [messageNature, setMessageNature] = useState('')

  // const personsList = persons.map(p => p.name);

  const personsFiltered = filter ? persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase())) : [...persons];

  useEffect(() => {
    phonebookService
      .getAll()
      .then(allContacts => {
        setPersons(allContacts);
        setNotificationMessage(null);
      })
      .catch(error => {
        setNotificationMessage(error.response.data.message);
        setMessageNature('error')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handleAdd = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }

    // Check if the person's name is already in cantact list
    // In which case just update the person.
    if (persons.map(p => p.name).includes(newName)) {
      if (window.confirm(`Do you really want to modify ${newName}?`)) {
        const person = persons.find(person => person.name === newName)
        phonebookService
          .update(person.id, newPerson)
          .then(modifiedContact => {
            // filter out the contact to modify so as to set the new one in the list
            const remainingPersons = persons.filter(person => person.name !== newName);
            setPersons(remainingPersons.concat(modifiedContact));
            setMessageNature('sucess');
            setNotificationMessage(`Modified ${modifiedContact.name}`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setNotificationMessage(error.response.data.message);
            setMessageNature('error')
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
      }
      return 
    }else if (persons.map(p => p.number).includes(newNumber)) {
      if (window.confirm(`Do you really want to modify ${newName}?`)) {
        const person = persons.find(person => person.number === newNumber)
        phonebookService
          .update(person.id, newPerson)
          .then(modifiedContact => {
            // filter out the contact to modify so as to set the new one in the list
            const remainingPersons = persons.filter(person => person.number !== newNumber);
            setPersons(remainingPersons.concat(modifiedContact));
            setMessageNature('sucess');
            setNotificationMessage(`Modified ${modifiedContact.name}`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setNotificationMessage(error.response.data.message);
            setMessageNature('error')
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
      }
      return 
    }




      phonebookService
        .create(newPerson)
        .then(addedContact => {
          setPersons(persons.concat(addedContact));
          setMessageNature('sucess');
          setNotificationMessage(`Added ${addedContact.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setNotificationMessage(error.response.data.message);
          setMessageNature('error')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        });

  } 

  const deleteContactHandler = (contactName) => {
    const contact = persons.find(person => person.name === contactName);
    if (window.confirm(`Do you really want to delete ${contactName}?`)) {
      phonebookService
        .remove(contact.id)
        .then(contactRemoved => {
          console.log("contactRemoved: ", contactRemoved);
          setPersons(persons.filter(person => person.id !== contact.id));
          setNotificationMessage(`Removed ${contactRemoved.name}`);
          setMessageNature('sucess')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
      })
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} nature={messageNature} />

      <Filter change={handleFilterChange}/>

      <h3>add a new </h3>

      <PersonForm add={handleAdd} nameChange={handleNameChange} numberChange={handleNumberChange} />

      <h2>Numbers</h2>
      {personsFiltered.map(person => {
        return <Person 
                  key={person.name} 
                  contact={person} 
                  deleteHandler={() => deleteContactHandler(person.name)} 
                />
      })}
    </div>
  )
}

export default App
