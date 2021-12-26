import React, { useEffect, useState } from "react";

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

import InfiniteScroll from 'react-infinite-scroll-component';

type CommentProps = {
    onClickedNewCommentButton: Function
}

const style = {
    card: {
        margin: '1em auto'
    }
}
const amountOfCommentsToShow: number = 10;
const Comments: React.FunctionComponent<CommentProps> = ({ onClickedNewCommentButton }) => {
    const [APIcomments, setAPIcomments] = useState<Array<Object>>([]);
    const [userScrolls, setUserScrolls] = useState<number>(0); //check if the user scrolled down, this is used to load more or less comments.

    const fetchData = () => {
        fetch(`http://jsonplaceholder.typicode.com/comments?_start=${userScrolls}&_end=${userScrolls + amountOfCommentsToShow}`)
            .then(response => response.json())
            .then(data => {
                if (APIcomments && APIcomments.length) {
                    let combinedComments: Array<Object> = APIcomments.concat(data);
                    console.log(combinedComments);
                    console.log(APIcomments);
                    setAPIcomments(combinedComments);
                }
                else {
                    setAPIcomments(data);
                }
            });
    };
    useEffect(() => {
        fetchData();
    }, [userScrolls])
    return (
        <div>
            <Button color="secondary" variant="contained" onClick={() => onClickedNewCommentButton()}>Add Comment</Button>
            {APIcomments ?
                <InfiniteScroll
                    dataLength={APIcomments ? APIcomments.length : amountOfCommentsToShow}
                    next={() => setUserScrolls(userScrolls + amountOfCommentsToShow)}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
                    <CommentList
                        comments={APIcomments}
                    />
                </InfiniteScroll>
                : <h1>No comments yet..</h1>}
        </div>
    )
};


type CommentListProps = {
    comments: Array<any>
    // userScrolls: number
    // setUserScrolls: Function
    // fetchData: Function,
}
const CommentList: React.FunctionComponent<CommentListProps> = ({ comments }) => {
    return (
        <List sx={{ width: '100%', maxWidth: 360, gap: 2, m: '0 auto' }}>
            {comments.map(comment => {
                return (
                    <Card style={style.card} key={comment.name}
                        sx={{ minWidth: 275 }} >
                        <CardContent>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={comment.name}
                                    disableTypography
                                    secondary={<CommentBody email={comment.email} body={comment.body} />}
                                />
                            </ListItem>
                        </CardContent>
                    </Card>
                )
            })}
        </List>
    )
};

type CommentBodyProps = {
    email: string,
    body: string,
}
const CommentBody: React.FunctionComponent<CommentBodyProps> = ({ email, body }) => {

    return (
        <div>
            <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
            >
                {email}
            </Typography>
            <Divider />
            <Typography component="span">{body}</Typography>
        </div>
    )
}
export default Comments;