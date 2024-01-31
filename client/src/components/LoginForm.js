import { useState } from 'react';
import { handleChange } from './utilities';
import Errors from './Errors';
import { submit } from './fetch';

function LoginForm({ onLogin, loadApp }) {
    const [form, setForm] = useState({email: "", password: ""});
    const [errors, setErrors] = useState();

    function handleSubmit(e) {
        e.preventDefault();
        setErrors();

        const callback = (user) => {
            onLogin(user);
            setForm({email: "", password: ""});
            loadApp();
        }

        submit('/login', 'POST', form, callback, setErrors);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-container">
                <i className="material-icons input-icon">mail</i>
                <input 
                    type="text" 
                    name="email" 
                    className="input-field" 
                    placeholder="Email" 
                    value={form.email} 
                    onChange={(e) => handleChange(form, setForm, e)} 
                />
            </div>
            <div className="input-container">
                <i className="material-icons input-icon">lock</i>
                <input 
                    type="password" 
                    name="password" 
                    className="input-field" 
                    placeholder="Password" 
                    value={form.password} 
                    onChange={(e) => handleChange(form, setForm, e)} 
                /> 
            </div>
            <input type="submit" className="input-submit" value="Sign In" />
            <Errors errors={errors} />
        </form>
    );
}

export default LoginForm;