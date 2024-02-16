import styled from "styled-components";

function IconButton({ onClick, icon, text, style }) {
    return (
        <Button 
            type='button' 
            onClick={onClick}
            style={{style}}
        >
            <i className="material-icons">{icon}</i>
            <p>{text}</p>
        </Button>
    );
}

const Button = styled.button`
align-items: center;
font: inherit;
font-size: .75em;
font-weight: 600;
background-color: #6a8532;
border: none;
border-radius: 4px;
color: white;
display: flex;
gap: 10px;
padding: 3px 16px;
opacity: .9;
&:hover {
    opacity: 1;
    cursor: pointer;
    transition: 1s;
`
export default IconButton;