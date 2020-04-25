import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'
import GroupCard from '../groups/GroupCard'
import Moment from 'moment'

class EventDisplay extends React.Component {
	state = {
		event: null,
		groups: null,
		user: null
	}

	async componentDidMount() {
		try {
			const userId = Auth.getPayload().sub
			const eventId = this.props.match.params.id
			await axios
				.all([
					axios.get(`/api/events/${eventId}`),
					axios.get(`/api/events/${eventId}/event_groups`),
					Auth.getPayload() && axios.get(`/api/user/${userId}`)
				])
				.then(
					axios.spread((eventRequest, groupsRequest, userRequest) => {
						this.setState({
							event: eventRequest.data,
							groups: groupsRequest.data,
							user: userRequest.data
						})
					})
				)
		} catch (error) {
			console.log(error)
		}
	}

	isOwner = () => {
		return Auth.getPayload().sub === this.state.event.owner.id
	}

	deleteEvent = async () => {
		const eventId = this.props.match.params.id
		try {
			await axios.delete(`/api/events/${eventId}/`, {
				headers: { Authorization: `Bearer ${Auth.getToken()}` }
			})
			this.props.history.push('/events')
		} catch (err) {
			this.props.history.push('/unknown-path')
		}
	}

	addToWishList = async () => {
		const user = this.state.user
		const pkArr = user.wish_list.map(event => event.id)
		const sendData = { wish_list: pkArr }
		const userId = Auth.getPayload().sub
		const eventId = this.state.event.id
		const ind = pkArr.indexOf(eventId)
		pkArr.includes(eventId) ? pkArr.splice(ind, 1) : pkArr.push(eventId)
		try {
			await axios.put(`/api/user/${userId}`, sendData, {
				headers: { Authorization: `Bearer ${Auth.getToken()}` }
			})
			window.location.reload(false)
		} catch (err) {
			console.log(err.response.data)
		}
	}

	addToShopCart = async () => {
		const user = this.state.user
		const pkArr = user.shopping_cart.map(event => event.id)
		const sendData = { shopping_cart: pkArr }
		const userId = Auth.getPayload().sub
		const eventId = this.state.event.id
		const ind = pkArr.indexOf(eventId)
		pkArr.includes(eventId) ? pkArr.splice(ind, 1) : pkArr.push(eventId)
		try {
			await axios.put(`/api/user/${userId}`, sendData, {
				headers: { Authorization: `Bearer ${Auth.getToken()}` }
			})
			window.location.reload(false)
		} catch (err) {
			console.log(err.response.data)
		}
	}

	currency = new Intl.NumberFormat('en-GB', {
		style: 'currency',
		currency: 'GBP',
		minimumFractionDigits: 2
	})

	render() {
		if (!this.state.event) return null
		if (!this.state.user) return null

		const eventDate = this.state.event.time_and_date
		const eventId = this.state.event.id
		const wishListArr = this.state.user.wish_list.map(event => event.id)
		const cartArr = this.state.user.shopping_cart.map(event => event.id)
		const filteredGroups = this.state.groups.filter(
			group => group.event.id === this.state.event.id
		)

		return (
			<body className='has-navbar-fixed-top'>
				<section className='main-body-event-disp'>
					<h1 className='ev-disp-title'>{this.state.event.title}</h1>
					<h3 className='ev-disp-subtitle'>
						Price:{' '}
						{this.state.event.price === 0
							? 'Free'
							: this.currency.format(this.state.event.price)}{' '}
						| {Moment(eventDate).format('lll')} | {this.state.event.location}
					</h3>

					<p className='ev-disp-subtitle'>{this.state.event.description}</p>
					<div>
						<h3 className='ev-disp-subtitle'>Groups</h3>

						{filteredGroups.map(group => (
							<div className='grp-card-sec'>
								<GroupCard key={group.id} {...group} />
							</div>
						))}
					</div>
					<hr className='divider-small' />
					<div className='buttons'>
						{Auth.isAuthenticated() ? (
							wishListArr && wishListArr.includes(eventId) ? (
								<button
									className='button is-rounded arr-btn'
									onClick={this.addToWishList}
								>
									Remove from Wishlist
								</button>
							) : (
								<button
									className='button is-rounded arr-btn'
									onClick={this.addToWishList}
								>
									Add to Wishlist
								</button>
							)
						) : null}

						<>
							{Auth.isAuthenticated() ? (
								cartArr && cartArr.includes(eventId) ? (
									<button
										className='button is-rounded arr-btn'
										onClick={this.addToShopCart}
									>
										Remove from Cart
									</button>
								) : (
									<button
										className='button is-rounded arr-btn'
										onClick={this.addToShopCart}
									>
										Add to Cart
									</button>
								)
							) : null}
						</>

						{Auth.isAuthenticated() ? (
							<>
								<Link to={`/events/${eventId}/event_groups/create`}>
									<button
										type='button is-rounded'
										className='button is-rounded arr-btn'
									>
										Create New Group
									</button>
								</Link>

								{this.isOwner() && (
									<div>
										<Link to={`/events/${eventId}/amend`}>
											<button
												className='button is-rounded arr-btn'
												type='button'
											>
												Amend Event
											</button>
										</Link>
										<button
											className='button is-rounded is-danger arr-btn'
											onClick={this.deleteEvent}
										>
											Delete Event
										</button>
									</div>
								)}
							</>
						) : null}
					</div>
				</section>
			</body>
		)
	}
}

export default EventDisplay
