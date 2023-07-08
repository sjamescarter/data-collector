import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user';
import styled from 'styled-components';

function NavBar() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function handleLogout() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(r => {
            if (r.ok) {
                navigate('/');
                setUser(null);
            }
        })
    }
    
    const activate = ({ isActive }) => isActive ? "active" : ""
    
    return (
        <SideNav>
            <h2>myData [Collector]</h2>
            <Welcome>{user.firstName} {user.lastName}, {user.jobTitle}</Welcome>
            <StyledNavLink to="/" className={activate}>
                <Icon className="material-icons">dashboard</Icon>
                Dashboard
            </StyledNavLink>
            <StyledNavLink to="/students" className={activate}>
                <Icon className="material-icons">groups</Icon>
                My Students
            </StyledNavLink>
            {/* <StyledNavLink to="/students/new" className={activate}>
                <Icon className="material-icons">person_add_alt_1</Icon>
                New Student
            </StyledNavLink> */}
            <StyledNavLink to="/goals/new" className={activate}>
                <Icon className="material-icons">assignment_add</Icon>
                New Goal
            </StyledNavLink>
            <SignOutButton onClick={handleLogout}>
                <Icon className="material-icons">logout</Icon>
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
    text-align: center;
    font-size: 1.2em;
`

const StyledNavLink = styled(NavLink)`
    color: white;
    display: flex;
    padding: 10px 0;
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

const Icon = styled.i`
    padding: 0 16px;
`
const SignOutButton = styled.button`
    background-color: #6a8532;
    border: none;
    color: white;
    display: flex;
    padding: 10px 0;
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