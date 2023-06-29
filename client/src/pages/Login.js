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
                        <p style={{textAlign: "center", padding: "16px"}}>
                            Need an account? 
                            <span className="link" onClick={() => setShowLogin(false)}>Sign Up Here!</span>
                        </p>
                    </div>
            ) : (
                    <div className="login">
                        <h1>Sign Up</h1>
                        <SignUpForm onLogin={onLogin} />
                        <p style={{textAlign: "center", padding: "16px"}}>
                            Already have an account? 
                            <span className="link" onClick={() => setShowLogin(true)}>Sign In Here!</span>
                        </p>
                    </div>
            )}
        </div>
    )
} 

export default Login