import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/notification/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const logged_user = window.localStorage.getItem('logged_bloglist_user')
    if (logged_user) {
      blogService.setToken(JSON.parse(logged_user).token)
      setUser(JSON.parse(logged_user))
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const usernameChangeHandler = ({target}) => {
    setUsername(target.value)
  }

  const passwordChangeHandler = ({target}) => {
    setPassword(target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await blogService.login({
        username: username,
        password: password
      })
      window.localStorage.setItem('logged_bloglist_user', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logoutHandler = () => {
    window.localStorage.removeItem('logged_bloglist_user')
    setUser(null)
  }

  const title_handler = (event) => {
    setTitle(event.target.value)
  }

  const author_handler = (event) => {
    setAuthor(event.target.value)
  }

  const url_handler = (event) => {
    setUrl(event.target.value)
  }

  const create_blog_handler = async event => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url
    }

    const response = await blogService.create(blog)

    const new_blogs = await blogService.getAll()

    setBlogs(new_blogs)
    setTitle('')
    setAuthor('')
    setUrl('')
    console.log('response: ', response);
    setSuccessMessage(response.data)

    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)

    console.log('Blog to created response is: ', response);
  }

  return (
    <div>
      <h2>blogs</h2>

      {errorMessage && <Notification.ErrorNotification />}
      {successMessage && <Notification.SuccessNotification created_blog={successMessage}/>}
      {
        user === null ?  <LoginForm 
                          username={username} 
                          password={password} 
                          setPassword={passwordChangeHandler} 
                          setUsename={usernameChangeHandler} 
                          handleSubmit={handleLogin}
                      />
                    :
                      <div>
                        <p>{user.username} is Logged in <button onClick={logoutHandler}>Logout</button></p>
                        <h1>Create new</h1>
                        <CreateBlogForm
                            title={title} 
                            title_handler={title_handler}
                            author={author}
                            author_handler={author_handler}
                            url={url}
                            url_handler={url_handler}
                            create_blog_handler={create_blog_handler}
                          />
                        {blogs.map(blog =>
                          <Blog key={blog.id} blog={blog} />
                        )}
                      </div>
      }
    </div>
  )
}

export default App