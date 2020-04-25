import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'

class ShoppingCart extends React.Component {
	state = {
		user: null,
		errors: null
	}

	async componentDidMount() {
		const userId = this.props.match.params.id
		try {
			const res = await axios.get(`/api/user/${userId}`)
			this.setState({ user: res.data })
			console.log(res.data)
		} catch (error) {
			console.log(error)
		}
	}

	remFromShopCart = async e => {
		const user = this.state.user
		const pkArr = user.shopping_cart.map(event => event.id)
		const sendData = { shopping_cart: pkArr }
		const userId = Auth.getPayload().sub
		const eventId = parseInt(e.target.name)
		const ind = pkArr.indexOf(eventId)
		pkArr.includes(eventId) ? pkArr.splice(ind, 1) : pkArr.push(eventId)
		try {
			await axios.put(`/api/user/${userId}`, sendData, {
				headers: { Authorization: `Bearer ${Auth.getToken()}` }
			})
			window.location.reload(false)
		} catch (err) {
			console.log(err.response.data)
		}
	}

	currency = new Intl.NumberFormat('en-GB', {
		style: 'currency',
		currency: 'GBP',
		minimumFractionDigits: 2
	})

	// handleChange = e => {
	//   const user = { ...this.state.user, [e.target.name]: e.target.value }
	//   const errors = { ...this.state.errors, [e.target.name]: '' }
	//   this.setState({ user, errors })
	// }

	// handleSubmit = async e => {
	//   e.preventDefault()
	//   const userId = this.props.match.params.id
	//   try {
	//     await axios.put(`/api/user/${userId}`, this.state.user, {
	//       headers: { Authorization: `Bearer ${Auth.getToken()}` }
	//     })
	//     this.props.history.push(`api/user/${userId}`)
	//   } catch (error) {
	//     console.log(error)
	//   }
	// }

	render() {
		const userId = Auth.getPayload().sub
		console.log('rendering')
		if (!this.state.user) return null
		const { user } = this.state
		return (
			<body className='has-navbar-fixed-top'>
				<section className='cart-body'>
					{Auth.isAuthenticated() && (
						<p className='cart-head'>{user.username}'s Shopping Cart:</p>
					)}
					{Auth.isAuthenticated() &&
					this.state.user.shopping_cart.length !== 0 ? (
						this.state.user.shopping_cart.map(item => {
							return (
								<>
									<Link className='cart-card' to={`/events/${item.id}`}>
										<div className='item-card-checkout'>
											<h3 className='cart-item'>{item.title}</h3>
											<h3 className='cart-item-price'>
												{this.currency.format(item.price)}
											</h3>
										</div>
									</Link>
									<button
										name={item.id}
										onClick={this.remFromShopCart}
										className='button cart-btn is-rounded is-danger'
									>
										Remove item
									</button>
									<hr className='divider' />
								</>
							)
						})
					) : (
						<p className='cart-head'>Your cart is empty!</p>
					)}

					{Auth.isAuthenticated() &&
					this.state.user.shopping_cart.length !== 0 ? (
						<Link to={`/user/${userId}/checkout`}>
							<button type='button' className='button is-rounded cart-btn'>
								Checkout
							</button>
						</Link>
					) : null}
				</section>
			</body>
		)
	}
}

export default ShoppingCart
