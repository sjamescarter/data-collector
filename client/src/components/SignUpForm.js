import { useState } from 'react';
import { handleChange } from './utilities';
import Errors from './Errors';

const formFields = {
    first_name: "",
    last_name: "",
    job_title: "",
    email: "",
    password: "",
    password_confirmation: ""
};

function SignUpForm({ onLogin, loadApp }) {
    const [signup, setSignup] = useState(formFields);
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signup)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((user) => onLogin(user));
                setSignup(formFields);
                loadApp();
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <i className="material-icons input-icon">person</i>
                    <input 
                        type="text" 
                        name="first_name" 
                        className="input-field" 
                        placeholder="First Name" 
                        value={signup.first_name} 
                        onChange={(e) => handleChange(signup, setSignup, e)} 
                    />
                    <input 
                        type="text" 
                        name="last_name" 
                        className="input-field" 
                        placeholder="Last Name" 
                        value={signup.last_name} 
                        onChange={(e) => handleChange(signup, setSignup, e)} 
                    />
                </div>

                <div className="input-container">
                    <i className="material-icons input-icon">work</i>
                    <input 
                        type="text" 
                        name="job_title" 
                        className="input-field" 
                        placeholder="Job Title" 
                        value={signup.job_title} 
                        onChange={(e) => handleChange(signup, setSignup, e)} 
                    />
                </div>
                
                <div className="input-container">
                    <i className="material-icons input-icon">mail</i>
                    <input 
                        type="text" 
                        name="email" 
                        className="input-field" 
                        placeholder="Email" 
                        value={signup.email} 
                        onChange={(e) => handleChange(signup, setSignup, e)} 
                    />
                </div>

                <div className="input-container">
                    <i className="material-icons input-icon">lock</i>
                    <input 
                        type="password" 
                        name="password" 
                        className="input-field" 
                        placeholder="Password" 
                        value={signup.password} 
                        onChange={(e) => handleChange(signup, setSignup, e)} 
                    />
                </div>

                <div className="input-container">
                    <i className="material-icons input-icon">lock</i>
                    <input 
                        type="password" 
                        name="password_confirmation" 
                        className="input-field" 
                        placeholder="Confirm Password" 
                        value={signup.password_confirmation} 
                        onChange={(e) => handleChange(signup, setSignup, e)} 
                    />
                </div>

                <input type="submit" className="input-submit" value="Sign Up" />
            </form>
            <Errors errors={errors} />
        </div>
    );
}

export default SignUpForm;
