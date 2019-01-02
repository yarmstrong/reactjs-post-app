import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise'

import reducers from './reducers'
import PostsIndex from './components/posts_index'
import CreatePost from './components/post_create'
import ShowPost from './components/post_show'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

ReactDOM.render(  
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<div className="col-md-12">
				<Switch>
					<Route path="/posts/new" component={CreatePost} />
					<Route path="/posts/:id" component={ShowPost} />
					<Route path="/" component={PostsIndex} />
				</Switch>
			</div>
		</BrowserRouter>
   </Provider>, document.getElementById('root')); 
registerServiceWorker();
