import React, { useEffect, useState } from "react";

type CommentProps = {
    onClickedNewCommentButton: Function
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
            <button onClick={() => onClickedNewCommentButton()}>Add Comment</button>
            {APIcomments ? 
            <ul className="comment-list">
                {APIcomments.map(comment => {
                    if (comment.name && comment.email && comment.body)
                    {
                        return (
                            <li key={comment.id}>
                                <h1>{comment.name}</h1>
                                <h2>{comment.email}</h2>
                                <p>{comment.body}</p>
                            </li>
                        )
                    } 
                    else 
                    {
                        return <h1>Comment Unavailable, Please check your internet connection.</h1>;
                    }
                   
                }) }
            </ul>
            : <h1>No comments yet..</h1>}
        </div>
    )
};

export default Comments;