import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user';
import styled from 'styled-components';

function NavBar() {
    const { user, setUser, setStudents } = useContext(UserContext);
    const { first_name: first, last_name: last, job_title: job } = user;
    const navigate = useNavigate();

    function handleLogout() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(r => {
            if (r.ok) {
                navigate('/');
                setUser(null);
                setStudents(null);
            }
        });
    }
    
    const activate = ({ isActive }) => isActive ? "active" : "";

    return (
        <SideNav>
            <h2>myData [Collector]</h2>
            <Welcome>
                <p style={{marginBottom: "0"}}>{first} {last}</p> 
                <small style={{marginTop: "0"}}>{job}</small>
            </Welcome>
            <StyledNavLink to="/" className={activate}>
                <i className="material-icons">dashboard</i>
                Dashboard
            </StyledNavLink>
            <StyledNavLink to="/students" className={activate}>
                <i className="material-icons">groups</i>
                Students
            </StyledNavLink>
            <SignOutButton onClick={handleLogout}>
                <i className="material-icons">logout</i>
                Sign Out
            </SignOutButton>
        </SideNav>
    );
}

const SideNav = styled.div`
    display: block;
    height: 100%;
    width: 12.5em;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #6a8532;
    overflow-x: hidden;
    padding-top: 20px;
`
const Welcome = styled.h2`
    color: white;
    font-size: 1.2em;
`
const StyledNavLink = styled(NavLink)`
    color: white;
    display: flex;
    padding: 10px 16px;
    gap: 10px;
    text-decoration: none;
    font-size: 1.25em;
    &.active {
        background-color: #f8f8f8;
        color: #6a8532;
    }
    &:hover {
        background-color: #f8f8f8;
        color: #6a8532;
    }
`
const SignOutButton = styled.button`
    background-color: #6a8532;
    border: none;
    color: white;
    display: flex;
    gap: 10px;
    padding: 10px 16px;
    text-decoration: none;
    font-size: 1.25em;
    width: 100%;
    cursor: pointer;
    &:hover {
        background-color: #f8f8f8;
        color: #6a8532;
    }
`

export default NavBar;