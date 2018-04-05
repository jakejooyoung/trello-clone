import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import './styles/normalize.css';
import './styles/app.scss';

const app = <App/>;

ReactDOM.render(app, document.getElementById('app-container'));
