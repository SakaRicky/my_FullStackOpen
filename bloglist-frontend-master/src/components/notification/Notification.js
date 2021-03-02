import React from 'react'
import './notification.css'

const ErrorNotification = () => {
    return <div className='error'>
                <p>Wrong username or password</p>
            </div>
}
const SuccessNotification = ({created_blog}) => {
    return <div className='success'>
                <p>{`a new blog ${created_blog.title} ${created_blog.author} added`}</p>
            </div>
}

export default {ErrorNotification, SuccessNotification}