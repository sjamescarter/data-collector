import { useState } from "react";

function useHandleSubmit(initialValue) {
    const { endpoint, method, form, callback } = initialValue;
    const [errors, setErrors] = useState();
    
    function handleSubmit(e) {
        e.preventDefault();
        setErrors();

        fetch(endpoint, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        .then(r => {
            if(r.ok) {
                r.json().then(callback);
            } else {
                r.json().then(err => setErrors(err.errors))
            }
        });
    } 

    const submitProps = {
        errors: errors,
        setErrors: setErrors,
        onSubmit: handleSubmit
    }

    return submitProps
}

export default useHandleSubmit;