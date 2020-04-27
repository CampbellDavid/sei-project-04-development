import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'
import { Card, Button } from 'react-bootstrap'

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
							<h1 className='title-head font text-center m-0 pb-3'>
								{this.state.sport.name}
							</h1>
							<div className='row'>
								<div className='col-6'>
									<img
										src={this.state.sport.image}
										alt={this.state.sport.name}
										className='m-0 img-responsive rounded'
									/>
								</div>

								<div className='col-6'>
									<p className='content-preset text-justify mt-2'>
										{this.state.sport.description}
									</p>
								</div>
							</div>

							<div className='events-section mb-4'>
								<h3 className='sub-head font text-center m-0 pt-4'>Events</h3>
								<div className='center-item-screen'>
									{this.state.sport.events.map((event) => {
										return (
											<p className='content-preset sub-font' key={event.title}>
												<Link to={`/events/${event.id}`}>{event.title}</Link>
											</p>
										)
									})}
								</div>
							</div>

							{Auth.isAuthenticated() ? (
								<>
									{this.isOwner() && (
										<div className=' row center-item-screen'>
											<Link to={'/events/create'}>
												<button
													type='button'
													className='btn btn-outline-light btn-presets'
													type='button'
												>
													Add Event
												</button>
											</Link>
											<Link to={`/sports/${sportId}/amend`}>
												<button
													type='button'
													className='btn btn-outline-light btn-presets'
													type='button'
												>
													Amend Sport
												</button>
											</Link>
											<button
												className='btn btn-danger btn-presets'
												onClick={this.deleteSport}
											>
												Delete Sport
											</button>
										</div>
									)}
								</>
							) : null}
						</div>
					</section>
				</div>
			</div>
		)
	}
}

export default SportDisplay
