import { useState } from 'react';
import { handleChange } from './utilities';
import Errors from './Errors';
import useHandleSubmit from '../hooks/useHandleSubmit';

function LoginForm({ onLogin, loadApp }) {
    const [form, setForm] = useState({email: "", password: ""});

    const { errors, onSubmit } = useHandleSubmit({
        endpoint: '/login',
        method: 'POST',
        form: form,
        callback: (user) => {
            onLogin(user);
            setForm({email: "", password: ""});
            loadApp();
        }
    })

    
    return (
        <form onSubmit={onSubmit}>
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