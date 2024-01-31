import { useState } from 'react';
import { handleChange } from './utilities';
import Errors from './Errors';

function LoginForm({ onLogin, loadApp }) {
    const [form, setForm] = useState({email: "", password: ""});
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((user) => onLogin(user));
                setForm({email: "", password: ""});
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
            </form>
            <Errors errors={errors} />
        </div>
    );
}

export default LoginForm;