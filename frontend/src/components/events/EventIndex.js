import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import EventCard from './EventCard'
import { Link } from 'react-router-dom'

class EventIndex extends React.Component {
	state = {
		events: null,
	}

	async componentDidMount() {
		try {
			const response = await axios.get('/api/events/')
			this.setState({ events: response.data })
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		if (!this.state.events) return null
		const events = this.state.events
		console.log('events:', events)
		return (
			<section className='body-div bg-set-2'>
				<div className='body-presets bg-grad'>
					<h1 className='title-head font'>Events</h1>
					<div className='row'>
						{events.map((event) => {
							return <EventCard key={event.id} {...event} />
						})}
					</div>

					<div className='p-3'>
						{Auth.isAuthenticated() ? (
							<Link to='/events/create'>
								<button
									type='button'
									className='btn btn-outline-light btn-presets'
								>
									Create New Event
								</button>
							</Link>
						) : null}
					</div>
				</div>
			</section>
		)
	}
}

export default EventIndex
