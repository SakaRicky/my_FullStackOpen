import React from 'react';

const Person = ({contact, deleteHandler}) => {
    return <p> {contact.name} : {contact.number} <button onClick={deleteHandler}>Delete</button></p>
}

export default Person;