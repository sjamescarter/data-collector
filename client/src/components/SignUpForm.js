import { useState } from 'react';
import { handleChange } from './utilities';
import Errors from './Errors';
import useHandleSubmit from '../hooks/useHandleSubmit';

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
    const onChange = (e) => handleChange(signup, setSignup, e)

    const { errors, onSubmit } = useHandleSubmit({
        endpoint: '/signup',
        method: 'POST',
        form: signup,
        callback: (user) => {
            onLogin(user);
            setSignup(formFields);
            loadApp();
        }
    });

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="input-container">
                    <i className="material-icons input-icon">person</i>
                    <input 
                        type="text" 
                        name="first_name" 
                        className="input-field" 
                        placeholder="First Name" 
                        value={signup.first_name} 
                        onChange={onChange} 
                    />
                    <input 
                        type="text" 
                        name="last_name" 
                        className="input-field" 
                        placeholder="Last Name" 
                        value={signup.last_name} 
                        onChange={onChange} 
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
                        onChange={onChange} 
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
                        onChange={onChange} 
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
                        onChange={onChange} 
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
                        onChange={onChange} 
                    />
                </div>

                <input type="submit" className="input-submit" value="Sign Up" />
            </form>
            <Errors errors={errors} />
        </div>
    );
}

export default SignUpForm;
