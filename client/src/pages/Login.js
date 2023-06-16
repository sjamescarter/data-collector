import { useState } from 'react';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';

function Login({ onLogin }) {
    const [showLogin, setShowLogin] = useState(true)

    return (
        <div>
            {showLogin? 
                (
                    <>
                    <h1>Sign In</h1>
                    <LoginForm onLogin={onLogin} />
                    <p>
                        New to this app? 
                        <button onClick={() => setShowLogin(!showLogin)}>Sign Up Here!</button>
                    </p>
                    </>
            ) : (
                <>
                    <h1>Sign Up</h1>
                    <SignUpForm onLogin={onLogin} />
                    <p>
                        Already have an account? 
                        <button onClick={() => setShowLogin(!showLogin)}>Sign In Here!</button>
                    </p>
                </>
            )}
        </div>
    )
} 

export default Login