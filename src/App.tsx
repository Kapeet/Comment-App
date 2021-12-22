import React, { useState } from 'react';
import './App.css';
import Header from './components/Header'
import Comments from './components/Comments';
import NewCommentForm from './components/newCommentForm';
function App() {

  const [isFormActive,setFormActive] = useState<boolean>(false);
  const onClickedNewCommentButton = () => {
    console.log("form active")
      setFormActive(true);
  }
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("submit");
    console.log(event);
  }
  return (
    <div className="App">
      {/* <Header /> */}
      {/* <header className="App-header"> */}
            <h1>Comments App</h1>
            <Comments onClickedNewCommentButton={onClickedNewCommentButton}/>
            {isFormActive ? <NewCommentForm isFormActive={isFormActive} setFormActive={setFormActive} handleSubmit={handleSubmit} /> : ''}
        {/* </header> */}
    </div>
  );
}

export default App;
