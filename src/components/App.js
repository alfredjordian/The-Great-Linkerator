import React from 'react';
import BookMark from './BookMark';
import CreateLinkCard from './CreateLinkCard';



const App = () => {

  return (
    <div className="App">
      <h1 style={{display: 'flex', justifyContent:'center', marginTop:'5%'}}>THE GREAT LINKERATOR</h1>
      <CreateLinkCard/>
      <BookMark/>
    </div>
  );
}

export default App;