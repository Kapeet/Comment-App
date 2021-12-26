import React from "react";
import { ImCancelCircle } from 'react-icons/im';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider';
import CancelIcon from '@mui/icons-material/Cancel';
interface newCommentProps {
    isFormActive: boolean,
    setFormActive: Function,
    handleSubmit: Function
}

const style = {
    box: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "25em",
        bgcolor: 'background.paper',
        boxShadow: 26,
        p: 3,
    },
    input: {
        margin: '0.5em'
    },
    comment: {
        margin: '0.5em',
        width: '100%'
    },
    Btn: {
        // display: 'block',
        margin: '0.5em auto'
    },
    flexDiv: {
        display: 'flex',
        justifyContent: 'center'
    }
};

const NewCommentForm = ({ isFormActive, setFormActive, handleSubmit }: newCommentProps) => {
    return (
        <Modal
            open={isFormActive}
            onClose={() => handleSubmit()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style.box}>
                <div style={{ display: 'flex' }}>
                    <TextField style={style.input} id="fullname" label="Your Full Name" variant="standard" />
                    <TextField style={style.input} id="email" label="Your Email" variant="standard" />
                </div>
                <TextField style={style.comment} id="commentbody" label="Your Comment" multiline variant="outlined" />
                <div style={style.flexDiv}>
                    <Button style={style.Btn} variant="contained">Add new comment</Button>

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
            </Box>
        </Modal>
    );
}

export default NewCommentForm;