import React from 'react';

import './App.scss';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="container" style={{paddingTop: 'env(safe-area-inset-top)'}}>
        <nav className="navbar fixed-top bg-white border-bottom justify-content-center" style={{paddingTop: 'calc(8px + env(safe-area-inset-top))'}}>
            <h5 className="mb-0">Coffee calculator</h5>
        </nav>
        <div style={{marginTop: '57px'}}>
            <Calculator />
        </div>
    </div>
  );
}

export default App;
