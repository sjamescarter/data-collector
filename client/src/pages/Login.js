import { useState } from 'react';
import styled from 'styled-components';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';

function Login({ onLogin, loadApp }) {
    const [showLogin, setShowLogin] = useState(true)

    return (
        <div>
            <div style={{backgroundColor: '#6a8532'}}>
                <Logo>myData [Collector]</Logo>
            </div>
                
            {showLogin
                ? <div className="login">
                    <H1>Sign In</H1>
                    <LoginForm onLogin={onLogin} loadApp={loadApp} />
                    <P>
                        Need an account? 
                        <span className="link" onClick={() => setShowLogin(false)}>Sign Up Here!</span>
                    </P>
                </div>
                : <div className="login">
                    <H1>Sign Up</H1>
                    <SignUpForm onLogin={onLogin} loadApp={loadApp} />
                    <P>
                        Already have an account? 
                        <span className="link" onClick={() => setShowLogin(true)}>Sign In Here!</span>
                    </P>
                </div>
            }
        </div>
    );
} 

const H1 = styled.h1`
    text-align: center;
`
const P = styled.p`
    text-align: center;
    padding: 16px;
`
const Logo = styled.h1`
    color: white;
    text-align: center;
    font-size: 2.5em;
    margin: auto;
    padding: 1em;
    width: 300px;
`
export default Login