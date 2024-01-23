function destroy(endpoint, callback) {
    fetch(endpoint, {
        method: "DELETE"
    })
    .then(r => {
        if(r.ok) {
            callback();
        }
    })
}

function get(endpoint, setState) {
    fetch(endpoint)
    .then(r => {
        if(r.ok) {
            r.json().then(data => setState(data))
        }
    });
} 

// Create or Update
function submit(endpoint, method, form, callback, setErrors) {
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

export { destroy, get, submit };