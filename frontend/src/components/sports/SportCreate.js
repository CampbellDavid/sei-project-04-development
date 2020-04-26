import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import SportForm from './SportForm'

class SportCreate extends React.Component {
	state = {
		sport: {},
		errors: null,
	}

	handleChange = (e) => {
		const sport = { ...this.state.sport, [e.target.name]: e.target.value }
		const errors = { ...this.state.errors, [e.target.name]: '' }
		this.setState({ sport, errors })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		console.log(this.state.sport)
		try {
			const response = await axios.post('/api/sports/', this.state.sport, {
				headers: { Authorization: `Bearer ${Auth.getToken()}` },
			})
			this.props.history.push(`/sports/${response.data.id}`)
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		return (
			<div className='body-div'>
				<section className='form'>
					<SportForm
						sport={this.state.sport}
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
					/>
				</section>
			</div>
		)
	}
}

export default SportCreate
