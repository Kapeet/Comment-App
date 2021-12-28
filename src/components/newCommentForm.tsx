import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'
import CancelIcon from '@mui/icons-material/Cancel';
import { newCommentProps } from "../propTypes";
import style from '../style';

const NewCommentForm: React.FunctionComponent<newCommentProps> = ({ setCommentData, isFormActive, setFormActive, handleSubmit }) => {

    const onSubmittedNewComment = (event: any) => {
        setFormActive(false);
        event.preventDefault();
        let submittedName: string = event.target["fullname"].value;
        let submittedEmail: string = event.target["email"].value;
        let submittedCommentBody: string = event.target["body"].value;
        setCommentData({
            fullname: submittedName,
            email: submittedEmail,
            body: submittedCommentBody
        });
    };
    return (
        <Modal
            open={isFormActive}
            onClose={() => handleSubmit()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style.box} className="modalbox">
                <form onSubmit={onSubmittedNewComment}>
                    <div>
                        <TextField name="fullname" style={style.input} id="fullname" label="Your Full Name" variant="standard" />
                        <TextField name="email" type="email" style={style.input} id="email" label="Your Email" variant="standard" />
                        <TextField name="body" style={style.comment} id="commentbody" label="Your Comment" multiline variant="standard" />
                    </div>
                    <div style={style.flexDiv}>
                        <Button style={style.Btn}
                            type="submit"
                            variant="contained">Add new comment</Button>

                        <Button
                            color="error"
                            style={style.Btn}
                            onClick={() => setFormActive(false)}
                            startIcon={<CancelIcon />}
                            variant="contained"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
}

export default NewCommentForm;