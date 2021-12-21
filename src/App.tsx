import React, { useState } from 'react';
import './App.css';
import Header from './components/Header'
import Comments from './components/Comments';
import NewCommentForm from './components/newCommentForm';
function App() {

  const [isFormActive,setFormActive] = useState<Boolean>(false);
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
      <Header />
      <Comments onClickedNewCommentButton={onClickedNewCommentButton}/>
      {isFormActive ? <NewCommentForm setFormActive={setFormActive} handleSubmit={handleSubmit} /> : ''}
    </div>
  );
}

export default App;
