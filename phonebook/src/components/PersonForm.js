import React from 'react';

const PersonForm = ({add, nameChange, numberChange}) => {
    return (
            <div>
                <form onSubmit={add}>
                <div>
                    name: <input onChange={nameChange}/>
                </div>
                <div>
                    phone number: <input onChange={numberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
                </form>
            </div>
        )
}

export default PersonForm;