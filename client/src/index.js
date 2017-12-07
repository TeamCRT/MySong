import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App.jsx';
import registerServiceWorker from './registerServiceWorker';
import "typeface-roboto";
import "typeface-bungee";
import "typeface-comfortaa";
import "typeface-rubik";
import "typeface-oxygen";
import "typeface-signika";
import "typeface-heebo";
import "typeface-baloo";



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
