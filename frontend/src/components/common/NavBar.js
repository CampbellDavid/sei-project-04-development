import React from 'react'
import { Link, withRouter } from 'react-router-dom'
// import { notify } from "react-notify-toast"
import Auth from '../../lib/auth'

class NavBar extends React.Component {
	state = {
		loggedIn: false,
		navOpen: false
	}

	toggleNavbar = () => {
		this.setState({
			loggedIn: !this.state.loggedIn,
			navOpen: !this.state.navOpen
		})
	}

	handleLogout = () => {
		Auth.logout()
		// notify.show('You\'ve logged out!', 'custom', 3000, { background: 'FFFFF0' })
		this.props.history.push('/')
	}

	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			this.setState({ loggedIn: false })
		}
	}

	render() {
		const userId = Auth.getPayload().sub
		console.log(this.props)
		console.log(Auth.getToken())
		return (
			<nav className='navbar is-dark is-fixed-top'>
				<div className='container'>
					<div className='navbar-brand'>
						<Link className='navbar-item' to='/'>
							HOME
						</Link>
						<p
							className={`navbar-burger ${
								this.state.navOpen ? 'is-active' : ''
							}`}
							onClick={this.toggleNavbar}
						>
							<span aria-hidden='true'></span>
							<span aria-hidden='true'></span>
							<span aria-hidden='true'></span>
						</p>
					</div>
					<div
						className={`navbar-menu ${this.state.navOpen ? 'is-active' : ''}`}
					>
						<div className='navbar-end'>
							<Link className='navbar-item' to='/sports'>
								SPORTS
							</Link>
							<Link className='navbar-item' to='/events'>
								EVENTS
							</Link>
							{!Auth.isAuthenticated() && (
								<Link className='navbar-item' to='/login'>
									LOGIN
								</Link>
							)}
							{!Auth.isAuthenticated() && (
								<Link className='navbar-item' to='/register'>
									REGISTER
								</Link>
							)}
							{Auth.isAuthenticated() && (
								<Link className='navbar-item' to={`/user/${userId}`}>
									MY ACCOUNT
								</Link>
							)}
							{Auth.isAuthenticated() && (
								<Link className='navbar-item' to={`/user/${userId}/cart`}>
									SHOPPING CART
								</Link>
							)}
							{Auth.isAuthenticated() && (
								<Link
									className='navbar-item'
									to='/'
									onClick={this.handleLogout}
								>
									LOGOUT
								</Link>
							)}
						</div>
					</div>
				</div>
			</nav>
		)
	}
}

export default withRouter(NavBar)
