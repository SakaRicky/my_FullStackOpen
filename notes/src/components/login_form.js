import React from 'react'

const login_form = ({handleLogin, username, password, usernameChange, passwordChange}) => {
    return (
        <form onSubmit={handleLogin}>
            <div>
            username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={usernameChange}
            />
            </div>
            <div>
            password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={passwordChange}
            />
            </div>
            <button type="submit">login</button>
      </form>      
    )
}

export default login_form; 