import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'
import GroupCard from '../groups/GroupCard'
import Moment from 'moment'
import {
	faStar,
	faTrash,
	faShoppingCart,
	faEdit,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class EventDisplay extends React.Component {
	state = {
		event: null,
		groups: null,
		user: null,
	}

	async componentDidMount() {
		try {
			const userId = Auth.getPayload().sub
			const eventId = this.props.match.params.id
			await axios
				.all([
					axios.get(`/api/events/${eventId}/`),
					axios.get(`/api/events/${eventId}/event_groups/`),
					Auth.getPayload() && axios.get(`/api/user/${userId}`),
				])
				.then(
					axios.spread((eventRequest, groupsRequest, userRequest) => {
						this.setState({
							event: eventRequest.data,
							groups: groupsRequest.data,
							user: userRequest.data,
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
				headers: { Authorization: `Bearer ${Auth.getToken()}` },
			})
			this.props.history.push('/events')
		} catch (err) {
			this.props.history.push('/unknown-path')
		}
	}

	addToWishList = async () => {
		const user = this.state.user
		const pkArr = user.wish_list.map((event) => event.id)
		const sendData = { wish_list: pkArr }
		const userId = Auth.getPayload().sub
		const eventId = this.state.event.id
		const ind = pkArr.indexOf(eventId)
		pkArr.includes(eventId) ? pkArr.splice(ind, 1) : pkArr.push(eventId)
		try {
			await axios.put(`/api/user/${userId}`, sendData, {
				headers: { Authorization: `Bearer ${Auth.getToken()}` },
			})
			window.location.reload(false)
		} catch (err) {
			console.log(err.response.data)
		}
	}

	addToShopCart = async () => {
		const user = this.state.user
		const pkArr = user.shopping_cart.map((event) => event.id)
		const sendData = { shopping_cart: pkArr }
		const userId = Auth.getPayload().sub
		const eventId = this.state.event.id
		const ind = pkArr.indexOf(eventId)
		pkArr.includes(eventId) ? pkArr.splice(ind, 1) : pkArr.push(eventId)
		try {
			await axios.put(`/api/user/${userId}`, sendData, {
				headers: { Authorization: `Bearer ${Auth.getToken()}` },
			})
			window.location.reload(false)
		} catch (err) {
			console.log(err.response.data)
		}
	}

	currency = new Intl.NumberFormat('en-GB', {
		style: 'currency',
		currency: 'GBP',
		minimumFractionDigits: 2,
	})

	render() {
		if (!this.state.event) return null
		if (!this.state.user) return null

		const eventDate = this.state.event.time_and_date
		const eventId = this.state.event.id
		const wishListArr = this.state.user.wish_list.map((event) => event.id)
		const cartArr = this.state.user.shopping_cart.map((event) => event.id)
		const filteredGroups = this.state.groups.filter(
			(group) => group.event.id === this.state.event.id
		)

		return (
			<div className='bg-set-9'>
				<div className='bg-grad'>
					<section className='body-div'>
						<div className='body-presets'>
							<h1 className='title-head font'>{this.state.event.title}</h1>
							<div className='row'>
								<div className='col-lg-6'>
									<h3 className='sub-head font'>
										{this.state.event.price === 0
											? 'Free'
											: this.currency.format(this.state.event.price)}{' '}
										| {this.state.event.location} |{' '}
										{Moment(eventDate).format('lll')}
									</h3>

									<p className='desc-preset sub-font text-justify'>
										{this.state.event.description}
									</p>
									<div className='text-center'>
										<div className='m-3 d-inline-flex'>
											{Auth.isAuthenticated() ? (
												wishListArr && wishListArr.includes(eventId) ? (
													<button
														className='btn-circle-full m-2'
														type='button'
														onClick={this.addToWishList}
													>
														<FontAwesomeIcon icon={faStar} />
													</button>
												) : (
													<button
														className='btn-circle m-2'
														type='button'
														onClick={this.addToWishList}
													>
														<FontAwesomeIcon icon={faStar} />
													</button>
												)
											) : null}

											{Auth.isAuthenticated() ? (
												cartArr && cartArr.includes(eventId) ? (
													<button
														className='btn-circle-full m-2'
														type='button'
														onClick={this.addToShopCart}
													>
														<FontAwesomeIcon icon={faShoppingCart} />
													</button>
												) : (
													<button
														className='btn-circle m-2'
														type='button'
														onClick={this.addToShopCart}
													>
														<FontAwesomeIcon icon={faShoppingCart} />
													</button>
												)
											) : null}

											{Auth.isAuthenticated() ? (
												<>
													{this.isOwner() && (
														<div>
															<Link to={`/events/${eventId}/amend`}>
																<button
																	className='btn-circle m-2'
																	type='button'
																>
																	<FontAwesomeIcon icon={faEdit} />
																</button>
															</Link>
															<button
																className='btn-circle-danger m-2'
																type='button'
																onClick={this.deleteEvent}
															>
																<FontAwesomeIcon icon={faTrash} />
															</button>
														</div>
													)}
												</>
											) : null}
										</div>
									</div>
								</div>
								<div className='col-lg-6 text-center'>
									<img
										src={this.state.event.image}
										alt={this.state.event.title}
										className='img-responsive rounded'
									/>
								</div>
							</div>
							<div className='row'>
								<div className='col-lg-12'>
									<h3 className='sub-head font'>Groups</h3>
									<div className='center-item-screen'>
										{filteredGroups.map((group) => (
											<div className='grp-card-sec'>
												<GroupCard key={group.id} {...group} />
											</div>
										))}
									</div>
									<div className='center-item-screen'>
										<Link to={`/events/${eventId}/event_groups/create`}>
											<button
												className='btn btn-outline-light btn-presets'
												type='button'
											>
												Create New Group
											</button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		)
	}
}

export default EventDisplay
