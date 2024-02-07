import { I } from "../styles";

function EditButtons({ addData, title, editAction, deleteAction }) {
    return (
        <div className="flex">
            {addData
                ? <I 
                    className="material-icons"
                    onClick={addData}
                    title="Add Data"
                >
                    add_chart
                </I>
                : null
            }
            <I 
                className="material-icons"
                onClick={editAction}
                title={`Edit ${title}`}
            >
                edit
            </I>
            <I 
                className="material-icons"
                onClick={deleteAction} 
                title={`Delete ${title}`}
            >
                delete
            </I>
        </div>
    );
}

export default EditButtons;