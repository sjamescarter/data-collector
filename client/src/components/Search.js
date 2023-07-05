import { InputContainer, InputIcon, InputField } from '../styles/';

function Search({ children, search, setSearch }) {
    return (
        <div style={{width: '80%', margin: 'auto'}}>
            <h3>Search</h3>
            <InputContainer>
                <InputIcon className="material-icons">search</InputIcon>     
                <InputField 
                    type="text" 
                    name="search" 
                    style={{backgroundColor: "#f8f8f8"}}
                    placeholder="Search Student Name" 
                    autoComplete="off"
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
            </InputContainer>
            {children}
        </div>
    );
}

export default Search;