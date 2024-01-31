function Errors({ errors }) {
    return (
        <ul className="errors">
            {errors ? errors.map((error) => <li key={error}>{error}</li>) : null}
        </ul>
    );
}

export default Errors;