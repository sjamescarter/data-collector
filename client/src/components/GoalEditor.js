import styled from 'styled-components';
import { handleChange } from './utilities';
import { InputField } from '../styles';

function GoalEditor({ children, student, goalForm, setGoalForm, onSubmit, cancel }) {
    const { subject, condition, behavior, accuracy, measurement } = goalForm;
    const onChange = (e) => handleChange(goalForm, setGoalForm, e);

    return (
        <Form onSubmit={onSubmit}>
            <div style={{textAlign: "left"}}>
                <Label>
                    SUBJECT
                    <InputField 
                        type="text"
                        name="subject"
                        placeholder="Reading, Writing..."
                        value={subject}
                        onChange={onChange}
                    />
                </Label>
                <Label>
                    CONDITION
                    <TextArea 
                        name="condition" 
                        placeholder="a reading passage..."
                        rows='3'
                        value={condition} 
                        onChange={onChange}
                    />
                </Label>
                <Label>
                    BEHAVIOR
                    <TextArea 
                        name="behavior" 
                        placeholder="correctly identify..."
                        rows='2'
                        value={behavior} 
                        onChange={onChange}
                    />
                </Label>
                <Label>
                    ACCURACY %
                    <InputField 
                        type="number" 
                        name="accuracy" 
                        placeholder="percentage"
                        value={accuracy} 
                        onChange={onChange}
                    />
                </Label>
                <Label>
                    MEASUREMENT
                    <TextArea 
                        name="measurement" 
                        placeholder="teacher records..."
                        rows='2'
                        value={measurement} 
                        onChange={onChange}
                    />
                </Label>
            </div>
            <Summary>
                <GoalTitle>{goalForm.subject} Goal</GoalTitle>
                <P>Given {goalForm.condition || 'CONDITION'}, {student.name.split(" ")[1]} will {goalForm.behavior || 'BEHAVIOR'} with {goalForm.accuracy || '###'}% accuracy as measured by {goalForm.measurement || 'MEASUREMENT'} by the next annual review.</P>
                {children}
                <Cancel type='button' onClick={cancel}>Cancel</Cancel>
            </Summary>
        </Form>
    );
}

const Form = styled.form`
    display: flex;
    box-sizing: border-box;
    gap: 2em;
`
const Label = styled.label`
`
const GoalTitle = styled.h3`
    border-bottom: 2px solid #999;
    padding: 0 0 1em 0;
`
const P = styled.p`
    margin-bottom: 3em;
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
const Summary = styled.div`
    width: 200%;
    font-size: 1.1em;
`
const Cancel = styled.button`
    border: 2px solid #6a8532;
    border-radius: 4px;
    color: #6a8532;
    font-weight: bold;
    font-size: .8em;
    margin: 20px;
    padding: 10px;
    background-color: #f8f8f8;
    &:hover {
        background-color: #f8f8f8;
        cursor: pointer;
    }
`
export default GoalEditor;