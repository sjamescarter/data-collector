import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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

function NavBar({ user, setUser }) {
    function handleLogout() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(r => {
            if (r.ok) {
                setUser(null);
                
            }
        })
    }

    const activate = ({ isActive }) => isActive ? "active" : ""

    return (
        <SideNav>
            <Welcome>Welcome, {user.first_name}</Welcome>
            <StyledNavLink to={"/"} className={activate}>
                <Icon className="material-icons">groups</Icon>
                Students
            </StyledNavLink>
            <StyledNavLink to={"/students/new"} className={activate}>
                <Icon className="material-icons">person_add_alt_1</Icon>
                New Student
            </StyledNavLink>
            <StyledNavLink to={"/goals/new"} className={activate}>
                <Icon className="material-icons">assignment_add</Icon>
                New Goal
            </StyledNavLink>
            <StyledNavLink to={"/logout"} onClick={handleLogout} className={activate}>
                <Icon className="material-icons">logout</Icon>
                Sign Out
            </StyledNavLink>
        </SideNav>
    );
}

export default NavBar;