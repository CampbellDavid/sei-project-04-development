import React from 'react'
import axios from 'axios'

class Register extends React.Component {
	state = {
		data: null,
		emailValid: false,
		formValid: false,
		passwordValid: false,
		formErrors: { email: '', password: '' },
	}

	handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		const data = { ...this.state.data, [name]: value }
		this.setState({ data }, () => {
			this.validateField(name, value)
		})
	}

	validateField(fieldName, value) {
		const fieldValidationErrors = this.state.formErrors
		let emailValid = this.state.emailValid
		let passwordValid = this.state.passwordValid

		switch (fieldName) {
			case 'email':
				emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
				fieldValidationErrors.email = emailValid ? '' : ' is invalid'
				break
			case 'password':
				passwordValid = value.length >= 1
				fieldValidationErrors.password = passwordValid ? '' : ' is too short'
				break
			default:
				break
		}
		this.setState(
			{
				formErrors: fieldValidationErrors,
				emailValid: emailValid,
				passwordValid: passwordValid,
			},
			this.validateForm
		)
	}

	validateForm() {
		this.setState({
			formValid: this.state.emailValid && this.state.passwordValid,
		})
	}

	errorClass(error) {
		return error.length === 0 ? '' : 'has-error'
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.post('/api/register', this.state.data)
			this.props.history.push('/login')
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		return (
			<div className='bg-set-11'>
				<div className='bg-grad'>
					<section className='form-body'>
						<div className='body-presets'>
							<div className='center-item-screen mt-5'>
								<h1 className='title-head font'>Register</h1>
							</div>
							<div className='form-wrapper'>
								<form onSubmit={this.handleSubmit}>
									<div className='main-form-group'>
										<input
											className='main-form-field'
											onChange={this.handleChange}
											placeholder='username'
											name='username'
											id='username'
											required
										/>
										<label htmlFor='username' className='main-form-label'>
											Username
										</label>
									</div>

									<div className='main-form-group'>
										<input
											className='main-form-field'
											onChange={this.handleChange}
											type='email'
											placeholder='email'
											name='email'
											id='email'
											required
										/>
										<label htmlFor='email' className='main-form-label'>
											Email
										</label>
									</div>

									<div className='main-form-group'>
										<input
											className='main-form-field'
											onChange={this.handleChange}
											type='password'
											placeholder='password'
											name='password'
											id='password'
											required
										/>
										<label htmlFor='password' className='main-form-label'>
											Password
										</label>
									</div>

									<div className='main-form-group'>
										<input
											className='main-form-field'
											onChange={this.handleChange}
											type='password'
											placeholder='confirm password'
											name='password_confirmation'
											id='password_confirmation'
											required
										/>
										<label
											htmlFor='password_confirmation'
											className='main-form-label'
										>
											Confirm Password
										</label>
									</div>

									<div className='mt-3 center-item-screen'>
										<button
											className='btn btn-outline-light btn-presets'
											type='submit'
											disabled={!this.state.formValid}
										>
											Register
										</button>
									</div>
								</form>
							</div>
						</div>
					</section>
				</div>
			</div>
		)
	}
}

export default Register

//TODO: Import form errors file
