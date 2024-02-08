import styled from "styled-components";
import { InputSubmit } from "../styles";
import Errors from "./Errors";
import { handleChange } from "./utilities";

function ObjectiveEditor({ onSubmit, errors, form, setForm, cancel }) {
    return (
        <form onSubmit={onSubmit}>
            <Div>
                <label>
                    DESCRIPTION
                    <TextArea 
                        name="description" 
                        rows={6}
                        value={form.description} 
                        onChange={(e) => handleChange(form, setForm, e)} 
                    />
                </label>
            </Div>
            <InputSubmit type="Submit" value="Submit" />
            <Errors errors={errors} />
            <Cancel type="button" onClick={cancel}>Cancel</Cancel>
        </form>
    );
}
const Div = styled.div`
    text-align: left;
`
const TextArea = styled.textarea`
    background-color: #f8f8f8;
    border: 1px solid #999;
    box-sizing: border-box;
    border-radius: 4px;
    font-family: 'Ubuntu';
    font-size: 1em;
    padding: 15px;
    margin: 5px 0 20px;
    width: 100%;
    &:focus {
        outline-color: #6a8532;
    }
`
const Cancel = styled.button`
    border: 2px solid #6a8532;
    border-radius: 4px;
    color: #6a8532;
    font-weight: bold;
    font-size: .8em;
    margin-top: 20px;
    padding: 10px;
    background-color: #f8f8f8;
    &:hover {
        background-color: #f8f8f8;
        cursor: pointer;
    }
`
export default ObjectiveEditor;