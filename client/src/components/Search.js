import { useNavigate } from 'react-router-dom';
import { I, InputContainer, InputIcon, InputField } from '../styles/';


function Search({ children, search, setSearch }) {
    const navigate = useNavigate();

    return (
        <div style={{width: '80%', margin: 'auto'}}>
            <h3>Search Students</h3>
            <InputContainer>
                <InputIcon className="material-icons">search</InputIcon>     
                <InputField 
                    type="text" 
                    name="search" 
                    style={{backgroundColor: "#f8f8f8"}}
                    placeholder="Student" 
                    autoComplete="off"
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
                <I 
                    onClick={() => navigate(`/students/new/${search}`)}
                    title="New Student"
                    className="material-icons"
                >
                    person_add_alt_1
                </I>
            </InputContainer>
            {children}
        </div>
    );
}

export default Search;