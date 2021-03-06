import React from 'react'
import { withRouter } from 'react-router-dom'
// import { notify } from "react-notify-toast"
import Auth from '../../lib/auth'

import { Navbar, Nav } from 'react-bootstrap'
import { faCampground } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class NavBar extends React.Component {
	state = {
		loggedIn: false,
		navOpen: false,
	}

	toggleNavbar = () => {
		this.setState({
			loggedIn: !this.state.loggedIn,
			navOpen: !this.state.navOpen,
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
			<Navbar
				bg='dark'
				expand='lg'
				className='navbar-dark fixed-top'
				id='mainNav'
			>
				<Nav className='mr-auto'>
					<Nav.Link className='nav-link nav-link-format text-light' href='/'>
						<FontAwesomeIcon icon={faCampground} />
					</Nav.Link>
				</Nav>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto'>
						<Nav.Link
							className='nav-link nav-link-format text-light'
							href='/sports'
						>
							SPORTS
						</Nav.Link>

						<Nav.Link
							className='nav-link nav-link-format text-light'
							href='/events'
						>
							EVENTS
						</Nav.Link>

						{!Auth.isAuthenticated() && (
							<Nav.Link
								className='nav-link nav-link-format text-light'
								href='/login'
							>
								LOGIN
							</Nav.Link>
						)}

						{!Auth.isAuthenticated() && (
							<Nav.Link
								className='nav-link nav-link-format text-light'
								href='/register'
							>
								REGISTER
							</Nav.Link>
						)}

						{Auth.isAuthenticated() && (
							<Nav.Link
								className='nav-link nav-link-format text-light'
								href={`/user/${userId}`}
							>
								MY ACCOUNT
							</Nav.Link>
						)}

						{Auth.isAuthenticated() && (
							<Nav.Link
								className='nav-link nav-link-format text-light'
								href={`/user/${userId}/cart`}
							>
								SHOPPING CART
							</Nav.Link>
						)}

						{Auth.isAuthenticated() && (
							<Nav.Link
								className='nav-link nav-link-format text-light'
								href='/'
								onClick={this.handleLogout}
							>
								LOGOUT
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default withRouter(NavBar)
