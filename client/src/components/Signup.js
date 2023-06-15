import { useState } from 'react';

const formFields = {
    first_name: "",
    last_name: "",
    job_title: "",
    email: "",
    password: "",
    password_confirmation: ""
}

function Signup() {
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
            setErrors([])
            if (r.ok) {
                r.json().then((r) => console.log(r))
                setSignup(formFields)
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="first_name">First Name: </label>
                <input type="text" name="first_name" value={signup.first_name} onChange={handleChange} />
                <label htmlFor="last_name">Last Name: </label>
                <input type="text" name="last_name" value={signup.last_name} onChange={handleChange} />
                <label htmlFor="job_title">Job Title: </label>
                <input type="text" name="job_title" value={signup.job_title} onChange={handleChange} />                
                <label htmlFor="email">Email: </label>
                <input type="text" name="email" value={signup.email} onChange={handleChange} />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" value={signup.password} onChange={handleChange} />
                <label htmlFor="password_confirmation">Password Confirmation: </label>
                <input type="password" name="password_confirmation" value={signup.password_confirmation} onChange={handleChange} />
                <input type="submit" value="Signup" />
            </form>
            {errors ? errors.map((error) => <li key={error}>{error}</li>) : null}
        </div>
    )
}

export default Signup
