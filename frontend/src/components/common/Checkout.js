import axios from 'axios'
import React from 'react'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

class Checkout extends React.Component {
	state = {
		user: null,
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
		cartArr.map((item) => priceArr.push(item.price))
		console.log(priceArr)
		const finalPrice = priceArr.reduce((a, b) => a + b)
		console.log(finalPrice)
		return this.currency.format(finalPrice)
	}

	currency = new Intl.NumberFormat('en-GB', {
		style: 'currency',
		currency: 'GBP',
		minimumFractionDigits: 2,
	})

	render() {
		if (!this.state.user) return null
		console.log(this.state.user)
		const { user } = this.state
		const userId = Auth.getPayload().sub
		console.log(userId)
		return (
			<div className='bg-set-9'>
				<div className='bg-grad'>
					<section className='body-div'>
						<div className='body-presets'>
							<h1 className='title-head font'>Checkout</h1>
							<div className='row center-item-screen'>
								{user.shopping_cart.map((item) => {
									return (
										<Card className='m-3' style={{ width: '18rem' }}>
											<Card.Img
												style={{ height: '50%' }}
												variant='top'
												src={item.image}
											/>
											<Card.Body className='d-flex flex-column'>
												<Card.Title>{item.title}</Card.Title>

												<div className='mt-auto'>
													<Card.Subtitle className='pt-2 pb-4'>
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
													</div>
												</div>
											</Card.Body>
										</Card>
									)
								})}
							</div>
							<div className='center-item-screen'>
								<p className='font sub-head'>Total: {this.getTotalPrice()}</p>
							</div>
							<div className='center-item-screen'>
								<Link to='/secure_payment'>
									<button
										type='button'
										className='btn btn-outline-light btn-presets'
									>
										Proceed to payment
									</button>
								</Link>
								<Link to={`/user/${userId}/cart`}>
									<button
										type='button'
										className='btn btn-outline-light btn-presets'
									>
										Back
									</button>
								</Link>
							</div>
						</div>
					</section>
				</div>
			</div>
		)
	}
}

export default Checkout
