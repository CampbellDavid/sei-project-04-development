import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import GroupForm from './GroupForm'

class GroupMake extends React.Component {
	state = {
		group: {
			group_name: ''
		}
	}

	handleChange = ({ target: { name, value } }) => {
		const group = { ...this.state.group, [name]: value }
		this.setState({ group })
	}

	handleSubmit = async e => {
		e.preventDefault()
		const eventId = this.props.match.params.id
		try {
			await axios.post(
				`/api/events/${eventId}/event_groups/`,
				this.state.group,
				{
					headers: { Authorization: `Bearer ${Auth.getToken()}` }
				}
			)
			this.props.history.push(`/events/${eventId}/`)
			console.log('group made successfully')
		} catch (error) {
			console.log(error.response.data)
		}
	}

	render() {
		return (
			<body className='has-navbar-fixed-top'>
				<GroupForm
					team={this.state.team}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
				/>
			</body>
		)
	}
}

export default GroupMake
