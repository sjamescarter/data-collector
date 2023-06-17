import { useState } from 'react';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';

function Login({ onLogin }) {
    const [showLogin, setShowLogin] = useState(true)

    return (
        <div>
            {showLogin? 
                (
                    <div className="login">
                        <h1>Sign In</h1>
                        <LoginForm onLogin={onLogin} />
                        <p style={{textAlign: "center"}}>
                            Need an account? 
                            <span className="btn" onClick={() => setShowLogin(false)}>Sign Up Here!</span>
                        </p>
                    </div>
            ) : (
                    <div className="login">
                        <h1>Sign Up</h1>
                        <SignUpForm onLogin={onLogin} />
                        <p>
                            Already have an account? 
                            <button onClick={() => setShowLogin(true)}>Sign In Here!</button>
                        </p>
                    </div>
            )}
        </div>
    )
} 

export default Login