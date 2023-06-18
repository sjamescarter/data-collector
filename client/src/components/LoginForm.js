import { useState } from 'react';

function LoginForm({ onLogin }) {
    const [form, setForm] = useState({email: "", password: ""});
    const [errors, setErrors] = useState([]);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

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
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <i className="material-icons input-icon">mail</i>
                    <input type="text" name="email" className="input-field" placeholder="Email" value={form.email} onChange={handleChange} />
                </div>
                <div className="input-container">
                    <i className="material-icons input-icon">lock</i>
                    <input type="password" name="password" className="input-field" placeholder="Password" value={form.password} onChange={handleChange} /> 
                </div>
                <input type="submit" className="input-submit" value="Sign In" />
            </form>
            <ul className="errors">
                {errors ? errors.map((error) => <li key={error}>{error}</li>) : null}
            </ul>
        </div>
    );
}

export default LoginForm;