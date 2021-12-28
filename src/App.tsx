import React, { useEffect, useState, Suspense } from 'react';
import './App.css';
import Header from './components/Header'
import Comments from './components/Comments';
import NewCommentForm from './components/newCommentForm';
import { newCommentData } from './propTypes';
import { Snackbar } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getAPIdata, postCommentToAPI } from './functions/api';
function App() {
  const [APIcomments, setAPIcomments] = useState<Array<Object>>([]);
  const [userScrolls, setUserScrolls] = useState<number>(0);

  const [isFormActive, setFormActive] = useState<boolean>(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [commentData, setCommentData] = useState<newCommentData | undefined>(undefined);
  const [isCommentPosted, setCommentPosted] = useState<boolean | undefined>(false);
  const handleSubmit = (event: any) => {
    event.preventDefault();
  }

  const getComments = async () => {
    let comments: any = await getAPIdata(APIcomments, userScrolls);
    setAPIcomments(comments);
  }
  const postComment = async () => {
    let isCommentPosted: boolean = await postCommentToAPI(commentData);
    if (isCommentPosted === true) {
      setCommentPosted(true);
    }
    else {
      setCommentPosted(false);
    }
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') { return; }
    setSnackbarOpen(false);
  };
  useEffect(() => {
    if (commentData) {
      postComment();
      setSnackbarOpen(true);
    }
  }, [commentData])

  const exitSnackbar = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleSnackbarClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  )
  return (
    <div className="App">
      <Snackbar open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={isCommentPosted ? "Comment succesfully posted!" : "Something went wrong while posting your comment!"}
        action={exitSnackbar}
      />
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <Comments getComments={getComments} userScrolls={userScrolls} setUserScrolls={setUserScrolls} APIcomments={APIcomments} onClickedNewCommentButton={() => setFormActive(true)} />
      {isFormActive ? <NewCommentForm commentData={commentData} setCommentData={setCommentData} isFormActive={isFormActive} setFormActive={setFormActive} handleSubmit={handleSubmit} /> : ''}
    </div>
  );
}

export default App;
