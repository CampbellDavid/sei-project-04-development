import React from 'react'
import Card from 'react-credit-cards'
import Auth from '../../../lib/auth'
import axios from 'axios'
import {
	formatCreditCardNumber,
	formatCVC,
	formatExpirationDate,
	formatFormData,
} from './utils'
import 'react-credit-cards/es/styles-compiled.css'

class Payment extends React.Component {
	state = {
		user: null,
		number: '',
		name: '',
		expiry: '',
		cvc: '',
		issuer: '',
		focused: '',
		formData: null,
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

	handleCallback = ({ issuer }, isValid) => {
		if (isValid) {
			this.setState({ issuer })
		}
	}

	handleInputFocus = ({ target }) => {
		this.setState({
			focused: target.name,
		})
	}

	handleInputChange = ({ target }) => {
		if (target.name === 'number') {
			target.value = formatCreditCardNumber(target.value)
		} else if (target.name === 'expiry') {
			target.value = formatExpirationDate(target.value)
		} else if (target.name === 'cvc') {
			target.value = formatCVC(target.value)
		}

		this.setState({ [target.name]: target.value })
	}

	handleSubmit = (e) => {
		e.preventDefault()
		alert(
			"This is a pseudo payment system for display purposes only. Your card details will not be saved and no payment will be processed. Please click 'OK' to reset the form."
		)
		this.form.reset()
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
		const { name, number, expiry, cvc, focused, issuer, formData } = this.state
		console.log(this.state.user)
		return (
			<section className='bg-black body-div'>
				<div className='body-presets'>
					<div className='center-item-screen'>
						<h1 className='title-head font m-0'>Secure Payment</h1>
					</div>
					<hr className='divider' />
					<div key='Payment'>
						<div className='App-payment'>
							<Card
								number={number}
								name={name}
								expiry={expiry}
								cvc={cvc}
								focused={focused}
								callback={this.handleCallback}
							/>
							<div className='form-wrapper center-item-screen'>
								<form ref={(c) => (this.form = c)} onSubmit={this.handleSubmit}>
									<div className='main-form-group'>
										<input
											type='tel'
											name='number'
											id='number'
											className='main-form-field'
											placeholder='Card Number'
											pattern='[\d| ]{16,22}'
											required
											onChange={this.handleInputChange}
											onFocus={this.handleInputFocus}
										/>
										<label htmlFor='number' className='main-form-label'>
											Card Number
										</label>
									</div>
									<div className='main-form-group'>
										<input
											type='text'
											name='name'
											id='name'
											className='main-form-field'
											placeholder='Name'
											required
											onChange={this.handleInputChange}
											onFocus={this.handleInputFocus}
										/>
										<label htmlFor='name' className='main-form-label'>
											Cardholder's Name
										</label>
									</div>
									<div className='row'>
										<div className='col-6 main-form-group'>
											<input
												type='tel'
												name='expiry'
												id='expiry'
												className='main-form-field'
												placeholder='Valid Thru'
												pattern='\d\d/\d\d'
												required
												onChange={this.handleInputChange}
												onFocus={this.handleInputFocus}
											/>
											<label htmlFor='expiry' className='main-form-label'>
												Card Expiry Date
											</label>
										</div>
										<div className='col-6 main-form-group'>
											<input
												type='tel'
												name='cvc'
												id='cvc'
												className='main-form-field'
												placeholder='CVC'
												pattern='\d{3,4}'
												required
												onChange={this.handleInputChange}
												onFocus={this.handleInputFocus}
											/>
											<label htmlFor='cvc' className='main-form-label'>
												CVC
											</label>
										</div>
									</div>
									<input type='hidden' name='issuer' value={issuer} />
									<hr className='divider' />
									<p className='font sub-head-2'>
										Total: {this.getTotalPrice()}
									</p>
									<hr className='divider' />
									<div className='form-actions center-item-screen'>
										<button className='btn btn-success btn-presets'>
											Proceed
										</button>
									</div>
								</form>
								<hr className='divider' />
							</div>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default Payment
