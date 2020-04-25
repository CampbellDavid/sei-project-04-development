import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class Login extends React.Component {
	state = {
		data: {
			email: '',
			password: '',
		},
		error: '',
	}

	handleChange = ({ target: { name, value } }) => {
		const data = { ...this.state.data, [name]: value }
		this.setState({ data, error: '' })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await axios.post('/api/login', this.state.data)
			Auth.setToken(res.data.token)
			this.props.history.push('/')
		} catch (error) {
			this.setState({ error: 'Wrong Username/Password Combination' })
		}
	}

	render() {
		return (
			<section className='main-body'>
				<h1 className='main-heading font'>Login</h1>
				<div className='form-wrapper'>
					<form onSubmit={this.handleSubmit}>
						<div className='main-form-group'>
							<input
								className='main-form-field'
								placeholder='email'
								name='email'
								id='email'
								onChange={this.handleChange}
								required
							/>
							<label htmlFor='email' className='main-form-label'>
								Email
							</label>
						</div>
						<div className='main-form-group'>
							<input
								className='main-form-field'
								type='password'
								placeholder='password'
								name='password'
								id='password'
								onChange={this.handleChange}
								required
							/>
							<label htmlFor='password' className='main-form-label'>
								Password
							</label>
						</div>
						<hr className='divider' />
						<div>
							<button className='button is-rounded' type='submit'>
								Login
							</button>
						</div>
					</form>
				</div>
			</section>
		)
	}
}

export default Login
// chg all to htmlfor
