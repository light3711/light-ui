import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';  //icon
import { fas } from '@fortawesome/free-solid-svg-icons';  //icon
import 'font-awesome/css/font-awesome.min.css';


const App : React.FC =  () => {
  return (
    <div className='App' >
      <h1></h1>
    </div>
  );
}
library.add(fas)

export default App;
