import React, { useState, useEffect } from 'react';

import Person from './components/Person';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import phonebookService from './services/phonebook';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const personsList = persons.map(p => p.name);

  const personsFiltered = filter ? persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase())) : [...persons];

  useEffect(() => {
    phonebookService
      .getAll()
      .then(allContacts => {
        setPersons(allContacts);
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

    if (personsList.includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const contact = persons.find(person => person.name === newName);
        const updatedContact = {...contact, number: newNumber}
        phonebookService
          .update(contact.id, updatedContact)
          .then(addedContact => {
                    const filtered = persons.filter(contact => contact.name !== newName)
                    setPersons(filtered.concat(addedContact))
                  })
      }
    } else {
      phonebookService
        .create(newPerson)
        .then(addedContact => {
          setPersons(persons.concat(addedContact))
        });
    }

    
    // personsList.includes(newName) ? phonebookService
    //                                   .update(newPerson)
    //                                   .then(addedContact => {
    //                                     setPersons(persons.concat(addedContact))
    //                                   }) :
    //                                   phonebookService
    //                                     .create(newPerson)
    //                                     .then(addedContact => {
    //                                       setPersons(persons.concat(addedContact))
    //                                     });
  } 

  const deleteContactHandler = (contactName) => {
    const contact = persons.find(person => person.name === contactName);
    if (window.confirm(`Do you really want to delete ${contactName}?`)) {
      phonebookService
        .remove(contact.id)
        .then(contacts => {
          setPersons(persons.filter(person => person.id !== contact.id))
      })
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>

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
