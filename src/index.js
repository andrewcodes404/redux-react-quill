import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';

import './style/style.css';
import reducers from './reducers'
import App from './components/App'
import Create from "./components/Create";
import Single from "./components/Single";
import Update from "./components/Update";
import Simple from "./components/Simple";

import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.bubble.css'


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const Routes = (
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div className="container">
            
                <header>
                    <Link to="/">home - </Link>
                    <Link to="/create">create</Link>
                </header>

                <Switch>
                    <Route path="/simple" component={Simple} />
                    <Route path="/create" component={Create} />
                    <Route path="/single/update/:id" component={Update} />
                    <Route path="/single/:id" component={Single} />
                    <Route path="/" component={App} />
                    
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(Routes, document.querySelector('#root'));
registerServiceWorker();