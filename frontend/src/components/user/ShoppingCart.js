import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

class ShoppingCart extends React.Component {
	state = {
		user: null,
		errors: null,
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

	remFromShopCart = async (e) => {
		const user = this.state.user
		const pkArr = user.shopping_cart.map((event) => event.id)
		const sendData = { shopping_cart: pkArr }
		const userId = Auth.getPayload().sub
		const eventId = parseInt(e.target.name)
		const ind = pkArr.indexOf(eventId)
		pkArr.includes(eventId) ? pkArr.splice(ind, 1) : pkArr.push(eventId)
		try {
			await axios.put(`/api/user/${userId}`, sendData, {
				headers: { Authorization: `Bearer ${Auth.getToken()}` },
			})
			window.location.reload(false)
		} catch (err) {
			console.log(err.response.data)
		}
	}

	currency = new Intl.NumberFormat('en-GB', {
		style: 'currency',
		currency: 'GBP',
		minimumFractionDigits: 2,
	})

	render() {
		const userId = Auth.getPayload().sub
		console.log('rendering')
		if (!this.state.user) return null
		const { user } = this.state
		return (
			<section className='bg-black body-div'>
				<div className='body-presets'>
					{Auth.isAuthenticated() && (
						<h1 className='title-head font'>Your Shopping Cart:</h1>
					)}
					<div className='row'>
						{Auth.isAuthenticated() &&
						this.state.user.shopping_cart.length !== 0 ? (
							this.state.user.shopping_cart.map((item) => {
								return (
									<Card className='m-3' style={{ width: '18rem' }}>
										<Card.Img
											variant='top'
											style={{ height: '50%' }}
											src={item.image}
										/>
										<Card.Body className='d-flex flex-column'>
											<Card.Title>{item.title}</Card.Title>

											<div className='mt-auto'>
												<Card.Subtitle className='pt-2 pb-2'>
													{this.currency.format(item.price)}
												</Card.Subtitle>

												<div className='center-item-screen'>
													<Button
														variant='dark'
														href={`/events/${item.id}`}
														className='mr-1'
													>
														View Event
													</Button>
													<Button
														name={item.id}
														onClick={this.remFromShopCart}
														className='btn btn-danger ml-1'
													>
														Remove item
													</Button>
												</div>
											</div>
										</Card.Body>
									</Card>
								)
							})
						) : (
							<p className='sub-head-2 font ml-5 mt-1'>Your cart is empty!</p>
						)}
					</div>

					{Auth.isAuthenticated() &&
					this.state.user.shopping_cart.length !== 0 ? (
						<Link to={`/user/${userId}/checkout`}>
							<button
								type='button'
								className='btn btn-outline-light btn-presets'
							>
								Checkout
							</button>
						</Link>
					) : null}
				</div>
			</section>
		)
	}
}

export default ShoppingCart
