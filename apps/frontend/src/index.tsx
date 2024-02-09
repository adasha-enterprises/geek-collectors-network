import React from 'react';
import ReactDOM from 'react-dom';

import './global.styles.scss';

export const App: React.FC = () => {
   return (
      <div className="flex">
         <h1>Hello World!</h1>
      </div>
   )
}

ReactDOM.render(React.createElement(App), document.getElementById('__react_app__'));
