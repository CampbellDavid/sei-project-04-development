import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import EventForm from './EventForm'

class EventCreate extends React.Component {
	state = {
		data: {
			title: '',
			price: '',
			time_and_date: '',
			location: '',
			sport: ''
		}
	}

	handleChange = ({ target: { name, value } }) => {
		const data = { ...this.state.data, [name]: value }
		this.setState({ data })
	}

	handleSubmit = async e => {
		e.preventDefault()
		try {
			const response = await axios.post('/api/events/', this.state.data, {
				headers: { Authorization: `Bearer ${Auth.getToken()}` }
			})
			this.props.history.push(`/events/${response.data.id}`)
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		return (
			<body className='has-navbar-fixed-top'>
				<section className='form'>
					<EventForm
						data={this.state.data}
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
					/>
				</section>
			</body>
		)
	}
}

export default EventCreate
