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
			sport: '',
			sportOps: null,
		},
	}

	async componentDidMount() {
		try {
			const res = await axios.get('/api/sports/')
			console.log(res.data[0].name)
			this.setState({ sportOps: res.data })

			this.state.sportOps.map((op) => console.log(op.name))
		} catch (error) {
			console.log(error)
		}
	}

	handleChange = ({ target: { name, value } }) => {
		const data = { ...this.state.data, [name]: value }
		this.setState({ data })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await axios.post('/api/events/', this.state.data, {
				headers: { Authorization: `Bearer ${Auth.getToken()}` },
			})
			this.props.history.push(`/events/${response.data.id}`)
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		if (!this.state.sportOps) return null

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

export default EventCreate
