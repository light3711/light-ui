import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'; //icon
import { fas } from '@fortawesome/free-solid-svg-icons'; //icon
import 'font-awesome/css/font-awesome.min.css';
var App = function () {
    return (React.createElement("div", { className: 'App' },
        React.createElement("h1", null)));
};
library.add(fas);
export default App;
