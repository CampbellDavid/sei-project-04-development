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
			<section className='bg-set-3 body-div'>
				<div className='body-presets bg-grad'>
					<h1 className='title-head font'>Sports</h1>
					<div className='row'>
						{sports.map((sport) => {
							return <SportCard key={sport.id} {...sport} />
						})}
					</div>

					<div className='m-4'>
						{Auth.isAuthenticated() ? (
							<Link to='/sports/create'>
								<button
									type='button'
									className='btn btn-outline-light btn-presets'
								>
									Create Sport
								</button>
							</Link>
						) : null}
					</div>
				</div>
			</section>
		)
	}
}

export default SportIndex
