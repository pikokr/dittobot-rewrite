import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Main from './routes/Main'

function App() {
    return (
        <BrowserRouter>
            <Route path="/" component={Main} />
        </BrowserRouter>
    )
}

export default App;
