import styled from "styled-components";

const InputField = styled.input`
    background-color: #f8f8f8;
    // border: none;
    border: 1px solid #999;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: 'Ubuntu';
    font-size: 1em;
    padding: 15px;
    // margin: 5px 0 20px;
    width: 100%;
    &:focus {
        outline-color: #6a8532;
    }
`
export default InputField;