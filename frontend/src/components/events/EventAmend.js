import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import EventForm from './EventForm'

class EventAmend extends React.Component {
	state = {
		data: {
			title: '',
			price: '',
			time_and_date: '',
			location: '',
			sport: ''
		}
	}

	async componentDidMount() {
		const eventId = this.props.match.params.id
		try {
			const response = await axios.get(`/api/events/${eventId}/`)
			this.setState({ data: response.data })
		} catch (error) {
			console.log(error)
		}
	}

	handleChange = ({ target: { name, value } }) => {
		const data = { ...this.state.data, [name]: value }
		console.log(data)
		this.setState({ data })
	}

	handleSubmit = async e => {
		e.preventDefault()
		const eventId = this.props.match.params.id
		console.log(eventId)
		try {
			const { data } = await axios.put(
				`/api/events/${eventId}/`,
				this.state.data,
				{
					headers: { Authorization: `Bearer ${Auth.getToken()}` }
				}
			)
			console.log({ data })
			this.props.history.push(`/events/${data.id}`)
		} catch (error) {
			console.log(error.response.data)
		}
	}

	render() {
		console.log(this.state.data)
		return (
			<body className='has-navbar-fixed-top'>
				<EventForm
					data={this.state.data}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
				/>
			</body>
		)
	}
}

export default EventAmend
