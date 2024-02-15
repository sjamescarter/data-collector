import styled from 'styled-components';
import { InputField } from '../styles/';

function Search({ search, setSearch }) {
    return (
        <Container className='flex'>
            <i className="material-icons">search</i>
            <InputField 
                type="text" 
                name="search" 
                style={{backgroundColor: "#f8f8f8"}}
                placeholder="Search Student Name" 
                autoComplete="off"
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
            />
        </Container>
    );
}
const Container = styled.div`
    gap: 1em;
    justify-content: space-between;
    margin: auto;
    margin-top: 1em;
    margin-bottom: 2em;
    width: 80%;
`
export default Search;