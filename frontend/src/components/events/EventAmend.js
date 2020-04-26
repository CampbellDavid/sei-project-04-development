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
			sport: '',
			sportOps: null,
		},
	}

	async componentDidMount() {
		const eventId = this.props.match.params.id
		try {
			await axios
				.all([axios.get(`/api/events/${eventId}/`), axios.get('/api/sports/')])
				.then(
					axios.spread((event, options) => {
						this.setState({
							data: event.data,
							sportOps: options.data,
						})
						console.log(this.state)
					})
				)
		} catch (error) {
			console.log(error)
		}
	}

	handleChange = ({ target: { name, value } }) => {
		const data = { ...this.state.data, [name]: value }
		console.log(data)
		this.setState({ data })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		const eventId = this.props.match.params.id
		console.log(eventId)
		try {
			const { data } = await axios.put(
				`/api/events/${eventId}/`,
				this.state.data,
				{
					headers: { Authorization: `Bearer ${Auth.getToken()}` },
				}
			)
			console.log({ data })
			this.props.history.push(`/events/${data.id}`)
		} catch (error) {
			console.log(error.response.data)
		}
	}

	render() {
		if (!this.state.sportOps) return null
		console.log(this.state)
		return (
			<div className='body-div'>
				<section className='form'>
					<EventForm
						data={this.state.data}
						sportOps={this.state.sportOps}
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
					/>
				</section>
			</div>
		)
	}
}

export default EventAmend
