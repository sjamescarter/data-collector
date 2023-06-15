import { useState } from 'react';

const formFields = {
    first_name: "",
    last_name: "",
    job_title: "",
    email: "",
    password: "",
    password_confirmation: ""
};
const keys = Object.keys(formFields);

function Signup({ onLogin }) {
    const [signup, setSignup] = useState(formFields);
    const [errors, setErrors] = useState([]);

    function handleChange(e) {
        setSignup({
            ...signup,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/users", {
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
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                {keys.map((key) => 
                    <div key={keys.indexOf(key)}>
                        <label htmlFor={key}>{key[0].toUpperCase() + key.split("_").join(" ").slice(1)}: </label>
                        <input type={key[0] === "p" ? "password" : "text"} name={key} value={signup[key]} onChange={handleChange} />   
                    </div>
                )}
                <input type="submit" value="Signup" />
            </form>
            {errors ? errors.map((error) => <li key={error}>{error}</li>) : null}
        </div>
    );
}

export default Signup;
