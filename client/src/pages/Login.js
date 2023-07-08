import { useState } from 'react';
import styled from 'styled-components';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';

function Login({ onLogin }) {
    const [showLogin, setShowLogin] = useState(true)

    return (
        <div>
            {showLogin? 
                (
                    <div className="login">
                        <H1>Sign In</H1>
                        <LoginForm onLogin={onLogin} />
                        <P>
                            Need an account? 
                            <span className="link" onClick={() => setShowLogin(false)}>Sign Up Here!</span>
                        </P>
                    </div>
            ) : (
                    <div className="login">
                        <H1>Sign Up</H1>
                        <SignUpForm onLogin={onLogin} />
                        <P>
                            Already have an account? 
                            <span className="link" onClick={() => setShowLogin(true)}>Sign In Here!</span>
                        </P>
                    </div>
            )}
        </div>
    )
} 

const H1 = styled.h1`
    text-align: center;
`

const P = styled.p`
    text-align: center;
    padding: 16px;
`
export default Login