
export type CommentsProps = {
    onClickedNewCommentButton: Function
};

export type CommentListProps = {
    comments: Array<any>
    // userScrolls: number
    // setUserScrolls: Function
    // fetchData: Function,
};

export type CommentBodyProps = {
    email: string,
    body: string,
};

export type newCommentData = {
    fullname: string,
    email: string,
    body: string
} | undefined;

export type newCommentProps = {
    commentData: newCommentData,
    setCommentData: Function,
    isFormActive: boolean,
    setFormActive: Function,
    handleSubmit: Function
};
