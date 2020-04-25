import axios from 'axios'
import React from 'react'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'

class Checkout extends React.Component {
	state = {
		user: null
	}

	async componentDidMount() {
		const userId = Auth.getPayload().sub
		try {
			const res = await axios.get(`/api/user/${userId}`)
			this.setState({ user: res.data })
		} catch (error) {
			console.log(error)
		}
	}

	getTotalPrice = () => {
		const cartArr = this.state.user.shopping_cart
		const priceArr = []
		cartArr.map(item => priceArr.push(item.price))
		console.log(priceArr)
		const finalPrice = priceArr.reduce((a, b) => a + b)
		console.log(finalPrice)
		return this.currency.format(finalPrice)
	}

	currency = new Intl.NumberFormat('en-GB', {
		style: 'currency',
		currency: 'GBP',
		minimumFractionDigits: 2
	})

	render() {
		if (!this.state.user) return null
		console.log(this.state.user)
		const { user } = this.state
		const userId = Auth.getPayload().sub
		console.log(userId)
		return (
			<body className='has-navbar-fixed-top'>
				<section className='cart-body'>
					<h1 className='cart-head'>Checkout</h1>

					{user.shopping_cart.map(item => {
						return (
							<Link to={`/events/${item.id}`}>
								<div className='item-card-checkout'>
									<p className='cart-item' key={item.title}>
										{item.title}
									</p>
									<p className='cart-item-price' key={item.price}>
										{this.currency.format(item.price)}
									</p>
								</div>
							</Link>
						)
					})}
					<p className='cart-item-price'>Total: {this.getTotalPrice()}</p>
					<hr className='divider-small' />
					<Link to='/secure_payment'>
						<button type='button' className='button is-rounded'>
							Proceed to payment
						</button>
					</Link>
				</section>
			</body>
		)
	}
}

export default Checkout
