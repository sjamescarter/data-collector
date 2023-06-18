import { useState } from 'react';

const formFields = {
    first_name: "",
    last_name: "",
    job_title: "",
    email: "",
    password: "",
    password_confirmation: ""
};

function SignUpForm({ onLogin }) {
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
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <i className="material-icons input-icon">person</i>
                    <input type="text" name="first_name" className="input-field" placeholder="First Name" value={signup.first_name} onChange={handleChange} />
                    <input type="text" name="last_name" className="input-field" placeholder="Last Name" value={signup.last_name} onChange={handleChange} />
                </div>

                <div className="input-container">
                    <i className="material-icons input-icon">work</i>
                    <input type="text" name="job_title" className="input-field" placeholder="Job Title" value={signup.job_title} onChange={handleChange} />
                </div>
                
                <div className="input-container">
                    <i className="material-icons input-icon">mail</i>
                    <input type="text" name="email" className="input-field" placeholder="Email" value={signup.email} onChange={handleChange} />
                </div>

                <div className="input-container">
                    <i className="material-icons input-icon">lock</i>
                    <input type="password" name="password" className="input-field" placeholder="Password" value={signup.password} onChange={handleChange} />
                </div>

                <div className="input-container">
                    <i className="material-icons input-icon">lock</i>
                    <input type="password" name="password_confirmation" className="input-field" placeholder="Confirm Password" value={signup.password_confirmation} onChange={handleChange} />
                </div>

                <input type="submit" className="input-submit" value="Sign Up" />
            </form>
            <ul className="errors">
                {errors ? errors.map((error) => <li key={error}>{error}</li>) : null}
            </ul>
        </div>
    );
}

export default SignUpForm;
