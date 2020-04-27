import React from 'react'
import axios from 'axios'
// import Auth from "../../lib/auth"
import SportForm from './SportForm'
import { headers } from './../../lib/headers'

class SportAmend extends React.Component {
	state = {
		sport: {},
		errors: null,
	}

	async componentDidMount() {
		window.scrollTo(0, 0)
		const sportId = this.props.match.params.id
		try {
			const response = await axios.get(`/api/sports/${sportId}/`)
			this.setState({
				sport: {
					name: response.data.name,
					image: response.data.image,
					description: response.data.description,
				},
			})
		} catch (error) {
			console.log(error)
		}
	}

	handleChange = (e) => {
		const sport = { ...this.state.sport, [e.target.name]: e.target.value }
		const errors = { ...this.state.errors, [e.target.name]: '' }
		this.setState({ sport, errors })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		const sportId = this.props.match.params.id
		console.log(sportId)
		try {
			const { data } = await axios.put(
				`/api/sports/${sportId}/`,
				this.state.sport,
				headers
			)
			console.log(data)
			this.props.history.push(`/sports/${data.id}`)
		} catch (error) {
			console.log(error.response.data)
		}
	}

	render() {
		console.log(this.state.sport)
		if (!this.state.sport) return null
		return (
			<div className='body-div'>
				<section className='form'>
					<SportForm
						sport={this.state.sport}
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
						errors={this.state.errors}
					/>
				</section>
			</div>
		)
	}
}

export default SportAmend
