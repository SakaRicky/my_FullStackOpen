import React from 'react'

const Notification = ({message, nature}) => {
    let style = 'error';
    if (message === null) {
        return null
    }

    if (nature === 'sucess') {
        style = 'sucess'
    }
    return (
        <div className={style}>
            {message}
        </div>
    )
}

export default Notification;