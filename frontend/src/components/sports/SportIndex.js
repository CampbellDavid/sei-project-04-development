import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import SportCard from './SportCard'
import { Link } from 'react-router-dom'

class SportIndex extends React.Component {
	state = {
		sports: null,
	}

	async componentDidMount() {
		try {
			const response = await axios.get('/api/sports/')
			this.setState({ sports: response.data })
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		if (!this.state.sports) return null
		const sports = this.state.sports
		console.log('sports:', sports)
		return (
			<section className='main-body-sport'>
				<h1 className='event-head font pt-5'>Sports</h1>
				<div className='meta-container-spt-disp'>
					{sports.map((sport) => {
						return (
							<div className='spt-cd-wrapper'>
								<SportCard key={sport.id} {...sport} />
							</div>
						)
					})}
				</div>

				<div className='m-4'>
					{Auth.isAuthenticated() ? (
						<Link to='/sports/create'>
							<button type='button' className='btn btn-outline-light'>
								Create Sport
							</button>
						</Link>
					) : null}
				</div>
			</section>
		)
	}
}

export default SportIndex
