import PropTypes from 'prop-types'
import Notification from './Notification'

const LoginForm = ({
    handleLogin,
    setUsername,
    setPassword,
    username,
    password,
    errorMessage
}) => {
    return (
        <div>
            <h2>Login to the application</h2>
            <Notification message={errorMessage}/>
            <form onSubmit={handleLogin}>
                <div>
                username
                    <input
                        type='text'
                        value={username}
                        name='Username'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                password
                    <input
                        type='text'
                        value={password}
                        name='Password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>)
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
}

export default LoginForm