function alphabetize(array) {
    return [...array].sort((a, b) => {
        const nameA = a.name
        const nameB = b.name
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
    });
}

function filter(array, search) {
    return [...array].filter(r => r.name.toUpperCase().includes(search.toUpperCase()));
}

function handleChange(state, setState, e) {
    setState({
        ...state,
        [e.target.name]: e.target.value
    });
}

export { alphabetize, filter, handleChange };