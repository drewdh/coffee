import React from 'react';

import './App.scss';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="container d-flex flex-column align-items-center" style={{paddingTop: 'env(safe-area-inset-top)'}}>
        {/*<nav className="navbar fixed-top bg-white border-bottom justify-content-center" style={{paddingTop: 'calc(8px + env(safe-area-inset-top))'}}>*/}
        {/*    <h5 className="mb-0">Coffee calculator</h5>*/}
        {/*</nav>*/}
        <Calculator />
    </div>
  );
}

export default App;
