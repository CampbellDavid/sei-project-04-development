import React from 'react'
import './stylesheets/main.scss'
import 'bulma'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css'

import NavBar from './components/common/NavBar'
import SecureRoute from './components/common/SecureRoute'

import Home from './components/common/Home'
import Login from './components/auth/Login'
import UserView from './components/user/UserView'
import UserAmend from './components/user/UserAmend'
import Checkout from './components/common/Checkout'
import Payment from './components/common/payment/Payment'

import ShoppingCart from './components/user/ShoppingCart'
import Register from './components/auth/Register'
import EventIndex from './components/events/EventIndex'
import EventCreate from './components/events/EventCreate'
import EventAmend from './components/events/EventAmend'
import EventDisplay from './components/events/EventDisplay'

import GroupMake from './components/groups/GroupMake'
import GroupAmend from './components/groups/GroupAmend'

import SportIndex from './components/sports/SportIndex'
import SportCreate from './components/sports/SportCreate'
import SportAmend from './components/sports/SportAmend'
import SportDisplay from './components/sports/SportDisplay'

import ErrorPage from './components/common/ErrorPage'

import './App.css'

function App() {
	return (
		<main className='has-navbar-fixed-top'>
			<BrowserRouter>
				<NavBar />
				<Switch>
					<Route exact path='/' component={Home} />

					<SecureRoute
						path='/events/:id/event_groups/:id/amend'
						component={GroupAmend}
					/>
					<SecureRoute
						path='/events/:id/event_groups/create'
						component={GroupMake}
					/>
					<SecureRoute path='/events/:id/amend' component={EventAmend} />
					<SecureRoute path='/events/create' component={EventCreate} />
					<Route path='/events/:id' component={EventDisplay} />
					<Route path='/events' component={EventIndex} />

					<SecureRoute path='/sports/:id/amend' component={SportAmend} />
					<SecureRoute path='/sports/create' component={SportCreate} />
					<Route path='/sports/:id' component={SportDisplay} />
					<Route path='/sports' component={SportIndex} />

					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
					<SecureRoute path='/secure_payment' component={Payment} />
					<SecureRoute path='/user/:id/checkout' component={Checkout} />
					<SecureRoute path='/user/:id/cart' component={ShoppingCart} />
					<SecureRoute path='/user/:id/amend' component={UserAmend} />
					<Route path='/user/:id' component={UserView} />

					<Route path='/*' component={ErrorPage} />
				</Switch>
			</BrowserRouter>
		</main>
	)
}

export default App
