import React, { useState } from 'react';
import BookMark from './BookMark';
import CreateLink from './CreateLink';
import { BrowserRouter as Router} from 'react-router-dom';



const App = () => {


  return (
    <Router>
    <div className="App">
      <h1 style={{display: 'flex', justifyContent:'center', marginTop:'5%'}}>THE GREAT LINKERATOR</h1>
      <CreateLink/>
      <BookMark/>
    </div>
    </Router>
  );
}

export default App;