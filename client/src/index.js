import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowseRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowseRouter>
        <App />
    </BrowseRouter>
);
