import { useState } from 'react';

function LoginForm({ onLogin }) {
    const [form, setForm] = useState({email: "", password: ""});
    const [errors, setErrors] = useState([]);
    const keys = Object.keys(form);

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
                <label htmlFor="email">Email: </label>
                <input type="text" value={form.email} onChange={handleChange} /> 
                <label htmlFor="password">Password: </label>
                <input type="password" value={form.password} onChange={handleChange} /> 
                <input type="submit" value="Sign In" />
            </form>
            {errors ? errors.map((error) => <li key={error}>{error}</li>) : null}
        </div>
    );
}

export default LoginForm;