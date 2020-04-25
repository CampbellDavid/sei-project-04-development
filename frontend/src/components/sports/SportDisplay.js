import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

class SportDisplay extends React.Component {
	state = {
		sport: null
	}

	async componentDidMount() {
		try {
			const sportId = this.props.match.params.id
			const response = await axios.get(`/api/sports/${sportId}`)
			this.setState({ sport: response.data })
		} catch (error) {
			console.log(error)
		}
	}

	isOwner = () => {
		return Auth.getPayload().sub === this.state.sport.owner.id
	}

	deleteSport = async () => {
		const sportId = this.props.match.params.id
		try {
			await axios.delete(`/api/sports/${sportId}/`, {
				headers: { Authorization: `Bearer ${Auth.getToken()}` }
			})
			this.props.history.push('/sports')
		} catch (err) {
			this.props.history.push('/unknown-path')
		}
	}

	render() {
		if (!this.state.sport) return null
		const sportId = this.props.match.params.id
		return (
			<body className='has-navbar-fixed-top'>
				<section className='main-body-sport-disp'>
					<h1 className='sport-disp-title'>{this.state.sport.name}</h1>

					<img
						src={this.state.sport.image}
						alt={this.state.sport.name}
						className='sport-img-disp'
					/>
					<hr className='divider-small' />
					<Link to={'/events/create'}>
						<button type='button' className='button is-rounded sport-arr-btn'>
							Add Event
						</button>
					</Link>
					<hr className='divider-small' />

					<div className='events-section'>
						<h3 className='events-title-spt'>Events:</h3>
						<p className='sport-card-content'>
							{this.state.sport.events.map(event => {
								return (
									<Link to={`/events/${event.id}`}>
										<p className='event-desc-spt-disp'>{event.title}</p>
									</Link>
								)
							})}
						</p>
					</div>
					<hr className='divider-small' />

					{Auth.isAuthenticated() ? (
						<>
							{this.isOwner() && (
								<div>
									<Link to={`/sports/${sportId}/amend`}>
										<button
											className='button is-rounded sport-arr-btn'
											type='button'
										>
											Amend Sport
										</button>
									</Link>
									<button
										className='button is-rounded is-danger sport-arr-btn'
										onClick={this.deleteSport}
									>
										Delete Sport
									</button>
								</div>
							)}
						</>
					) : null}

					<div className='right-column'>
						<p className='sport-description'>{this.state.sport.description}</p>
					</div>
				</section>
			</body>
		)
	}
}

export default SportDisplay
