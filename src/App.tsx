import React, { useEffect, useState, Suspense } from 'react';
import './App.css';
import Header from './components/Header'
import Comments from './components/Comments';
import NewCommentForm from './components/newCommentForm';
import { newCommentData } from './propTypes';
import { Snackbar } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
function App() {

  const [isFormActive, setFormActive] = useState<boolean>(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const onClickedNewCommentButton = () => {
    console.log("form active")
    setFormActive(true);
  };
  const [commentData, setCommentData] = useState<newCommentData | undefined>(undefined);
  const [isCommentPosted, setCommentPosted] = useState<boolean | undefined>(false);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("submit");
    console.log(event);
  }
  const postComment = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData)
    };
    fetch('https://test.steps.me/test/testAssignComment', requestOptions)
      .then(res => res.json())
      .then(data => setCommentPosted(true))
      .catch(err => {
        setCommentPosted(false);

      })
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
      <Comments onClickedNewCommentButton={onClickedNewCommentButton} />
      {isFormActive ? <NewCommentForm commentData={commentData} setCommentData={setCommentData} isFormActive={isFormActive} setFormActive={setFormActive} handleSubmit={handleSubmit} /> : ''}
      {/* </header> */}
    </div>
  );
}

export default App;
