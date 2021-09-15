import React, { Fragment } from 'react';
import { render } from 'react-dom';
import MakeTableControls from './components/make-table-controls';
import './style.css';

function App() {
  return (
    <Fragment>
      <MakeTableControls />

      <hr />

      <div id="table-root" />
    </Fragment>
  );
}

render(<App />, document.getElementById('root'));

export default App;
