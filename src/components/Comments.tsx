import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
type CommentProps = {
    onClickedNewCommentButton: Function
}

const style = {
    card: {
        margin: '1em auto'
    }
}
const Comments: React.FunctionComponent<CommentProps> = ({onClickedNewCommentButton}) => {
    const [APIcomments, setAPIcomments] = useState<Array<any>>([]);
    const [userScrolls, setUserScrolls] = useState<number>(0); //check if the user scrolled down, this is used to load more or less comments.

    useEffect(() => {
        fetch(`http://jsonplaceholder.typicode.com/comments?_start=${userScrolls}&_end=${userScrolls + 5}`)
        .then(response => response.json())
        .then(data => {
            setAPIcomments(data);
        });
    },[])
    return (
        <div>
            <h1>Comments component lolol</h1>
            <Button color="secondary" variant="contained" onClick={() => onClickedNewCommentButton()}>Add Comment</Button>
            {APIcomments ? <CommentList comments={APIcomments} /> : <h1>No comments yet..</h1>}
        </div>
    )
};


type CommentListProps = {
    comments: Array<any>
}
const CommentList: React.FunctionComponent<CommentListProps> = ({comments}) => {
    return (
        <List sx={{ width: '100%', maxWidth: 360, gap: 2,m: '0 auto'}}>
            {comments.map(comment => {
                return (
                    <Card style={style.card}
                          sx={{ minWidth: 275 }} key={comment.name}>
                        <CardContent>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={comment.name}
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                        >
                                        {comment.email}
                                        </Typography>
                                        <Divider />
                                        <Typography>
                                        {comment.body}

                                        </Typography>
                                    </React.Fragment>
                                    }
                                    />
                            </ListItem>
                        </CardContent>
                    </Card>
                )
            })}
        </List>
    )
};
export default Comments;