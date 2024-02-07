import styled from "styled-components";
import { I } from "../styles";

function Errors({ errors }) {
    return (
        <div>
            {errors 
                ? errors.map((error) => 
                    <Error 
                        key={error}
                    >
                        <I className="material-icons">warning</I>
                        {error}
                    </Error>
                ) 
                : null
            }
        </div>
    );
}

const Error = styled.li`
    background-color: #eb5e28;
    border-radius: 4px;
    box-sizing: border-box;
    color: #f8f8f8;
    display: flex;
    gap: 6px;
    list-style: none;
    margin: 5px;
    padding: 4px;
`
export default Errors;