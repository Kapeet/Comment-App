import React from "react";
import {ImCancelCircle} from 'react-icons/im';
interface newCommentProps {
    setFormActive: Function,
    handleSubmit: Function
}
const NewCommentForm = ({setFormActive, handleSubmit}: newCommentProps) => {
    return (
        <div className="newCommentForm">
            <ImCancelCircle className="exitForm" onClick={() => setFormActive(false)} />
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    help
                    <input type="text" />
                </label>
                <button type="submit">Submit new Comment</button>
            </form>
        </div>
    );
}

export default NewCommentForm;