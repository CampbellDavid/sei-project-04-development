import React from 'react'
import Auth from '../../lib/auth'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import GroupAmend from './GroupAmend'

import { Card, Button } from 'react-bootstrap'

class GroupCard extends React.Component {
	state = {
		group: {
			group_name: '',
			attendees: [],
			event: {},
			owner: {},
			id: '',
		},
		errors: {},
	}

	isOwner = () => Auth.getPayload().sub === this.state.group.owner.id

	async componentDidMount() {
		const groupId = this.props.id
		const eventId = this.props.event.id
		try {
			const response = await axios.get(
				`/api/events/${eventId}/event_groups/${groupId}/`
			)
			this.setState({ group: response.data })
		} catch (error) {
			this.setState({ errors: error.response.data.errors })
		}
	}

	handleClick = async (e) => {
		e.preventDefault()
		const userId = Auth.getPayload().sub
		const attendeesArray = this.state.group.attendees
		try {
			const user = await axios.get(`/api/user/${userId}`)
			const currentUser = attendeesArray.filter(
				(attendee) => attendee.id === userId
			)[0]
			const index = attendeesArray.indexOf(currentUser)
			attendeesArray.some((attendee) => attendee.id === user.data.id)
				? attendeesArray.splice(index, 1)
				: attendeesArray.push(user.data)
			this.setState({ attendees: attendeesArray })
			this.handleSubmit()
		} catch (err) {
			console.log(err.response.data)
		}
	}

	handleSubmit = async (e) => {
		const { group } = this.state
		const sendData = {
			group_name: group.group_name,
			attendees: group.attendees.map((attendee) => attendee.id),
			event: group.event,
			owner: group.owner,
			id: group.id,
		}
		const groupId = this.props.id
		const eventId = this.props.event.id
		try {
			await axios.put(
				`/api/events/${eventId}/event_groups/${groupId}/`,
				sendData,
				{
					headers: { Authorization: `Bearer ${Auth.getToken()}` },
				}
			)
		} catch (err) {
			console.log(err.response.data)
		}
	}

	deleteGroup = async () => {
		const groupId = this.props.id
		const eventId = this.props.event.id
		console.log(this.props)
		try {
			await axios.delete(`/api/events/${eventId}/event_groups/${groupId}/`, {
				headers: { Authorization: `Bearer ${Auth.getToken()}` },
			})
			window.location.reload(false)
		} catch (err) {
			console.log(err)
		}
	}

	render() {
		const userId = Auth.getPayload().sub
		const { group } = this.state
		const lead = group.attendees[0]
		return (
			<section>
				<div className='row'>
					<div className='col-6'>
						<h2 className='text-left font sub-head m-0 nowrap'>
							Group Name: '{group.group_name}'
						</h2>
					</div>
					<div className='col-6'>
						{lead && (
							<h2 className='text-right font sub-head m-0 nowrap'>
								Leader: {lead.first_name}
							</h2>
						)}
					</div>
				</div>
				{group.attendees !== null ? (
					<div className='row center-item-screen'>
						{group.attendees.map((attendee, i) => {
							return (
								<Card key={i} className='m-3' style={{ width: '14rem' }}>
									<Card.Img
										variant='top'
										style={{ height: '65%' }}
										src={attendee.profile_image}
										alt={attendee.username}
									/>
									<Card.Body className='d-flex flex-column'>
										<div className='mt-auto'>
											<div className='center-item-screen mb-1'>
												<Card.Subtitle className='text-dark'>
													{attendee.first_name} {attendee.last_name}
												</Card.Subtitle>
											</div>
										</div>
									</Card.Body>
									<Card.Footer>
										<div className='center-item-screen'>
											<Button variant='dark' href={`/user/${attendee.id}`}>
												View User
											</Button>
										</div>
									</Card.Footer>
								</Card>
							)
						})}
					</div>
				) : null}

				<div className='text-center'>
					{group.attendees !== null ? (
						Auth.isAuthenticated() ? (
							<div>
								{group.attendees.some((attendee) => attendee.id === userId) ? (
									<div>
										<button
											type='button'
											className='btn btn-outline-light btn-presets'
											onClick={this.handleClick}
										>
											Leave
										</button>
									</div>
								) : (
									<div>
										<button
											type='button'
											className='btn btn-outline-light btn-presets'
											onClick={this.handleClick}
										>
											Join
										</button>
									</div>
								)}
								{this.isOwner() && (
									<div>
										<Link
											to={`/events/${group.event.id}/event_groups/${group.id}/amend`}
										>
											<button
												type='button'
												className='btn btn-outline-light btn-presets'
											>
												Edit
											</button>
										</Link>
										<button
											onClick={this.deleteGroup}
											type='button'
											className='btn btn-danger btn-presets'
										>
											Delete
										</button>
									</div>
								)}
							</div>
						) : null
					) : null}
				</div>
			</section>
		)
	}
}

export default GroupCard
