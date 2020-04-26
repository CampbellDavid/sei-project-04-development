import React from 'react'
import axios from 'axios'
// import Auth from "../../lib/auth"
import GroupForm from './GroupForm'
import { headers } from './../../lib/headers'

class GroupAmend extends React.Component {
	state = {
		event_group: {},
		data: {
			group_name: '',
		},
	}

	async componentDidMount() {
		const groupId = this.props.location.pathname.charAt(23)
		const eventId = this.props.match.params.id
		console.log('groupId', groupId)
		console.log('eventId', eventId)

		try {
			const response = await axios.get(
				`/api/events/${eventId}/event_groups/${groupId}`
			)
			this.setState({ event_group: response.data })
			console.log(eventId)
		} catch (error) {
			console.log(error)
		}
	}

	handleChange = ({ target: { value } }) => {
		this.setState({
			data: { ...this.state.data, group_name: value },
		})
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		const eventId = this.state.event_group.event.id
		const groupId = this.state.event_group.id

		try {
			await axios.put(
				`/api/events/${eventId}/event_groups/${groupId}/`,
				this.state.data,
				headers
			)
			this.props.history.push(`/events/${eventId}`)
		} catch (error) {
			console.log(error.response.data)
		}
	}

	render() {
		console.log(this.state)
		return (
			<div className='body-div'>
				<section className='form'>
					<GroupForm
						data={this.state.data}
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
					/>
				</section>
			</div>
		)
	}
}

export default GroupAmend
