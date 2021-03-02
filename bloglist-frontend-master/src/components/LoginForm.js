import React from "react";

const LoginForm = ({username, password, setUsename, setPassword, handleSubmit}) => {
    return <form onSubmit={handleSubmit}>
                <div>
                    Username: <input type="text" value={username} name="username" onChange={setUsename} />
                </div>
                <div>
                    Password: <input type="password" value={password} name="paswword" onChange={setPassword} />
                </div>
                <div>
                    <button type="submit" value="Submit">Login</button>
                </div>
            </form>
}

export default LoginForm