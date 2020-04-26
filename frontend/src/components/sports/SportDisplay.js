import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

class SportDisplay extends React.Component {
	state = {
		sport: null,
	}

	async componentDidMount() {
		try {
			const sportId = this.props.match.params.id
			const response = await axios.get(`/api/sports/${sportId}/`)
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
				headers: { Authorization: `Bearer ${Auth.getToken()}` },
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
			<div className='bg-set-13'>
				<div className='bg-grad'>
					<section className='body-div'>
						<div className='body-presets'>
							<h1 className='title-head font'>{this.state.sport.name}</h1>
							<img
								src={this.state.sport.image}
								alt={this.state.sport.name}
								className='sport-img-disp mb-2 img-responsive'
							/>

							<div className='events-section mb-4'>
								<h3 className='sub-head font'>Events:</h3>
								<p className='sport-card-content'>
									{this.state.sport.events.map((event) => {
										return (
											<Link to={`/events/${event.id}`}>
												<p className='event-desc-spt-disp'>{event.title}</p>
											</Link>
										)
									})}
								</p>
							</div>

							{Auth.isAuthenticated() ? (
								<>
									{this.isOwner() && (
										<div>
											<Link to={'/events/create'}>
												<button
													type='button'
													className='btn btn-outline-light sport-arr-btn'
													type='button'
												>
													Add Event
												</button>
											</Link>
											<Link to={`/sports/${sportId}/amend`}>
												<button
													type='button'
													className='btn btn-outline-light sport-arr-btn'
													type='button'
												>
													Amend Sport
												</button>
											</Link>
											<button
												className='btn btn-danger sport-arr-btn'
												onClick={this.deleteSport}
											>
												Delete Sport
											</button>
										</div>
									)}
								</>
							) : null}

							<div className='right-column'>
								<p className='sport-description text-justify'>
									{this.state.sport.description}
								</p>
							</div>
						</div>
					</section>
				</div>
			</div>
		)
	}
}

export default SportDisplay
