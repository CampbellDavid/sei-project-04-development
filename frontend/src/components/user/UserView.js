import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
// import image from "../../assets/user-bg.jpg"
import { Card, Button } from 'react-bootstrap'

class UserView extends React.Component {
	state = {
		user: null,
	}

	isOwner = () => Auth.getPayload().sub === this.state.user.id

	async componentDidMount() {
		const userId = this.props.match.params.id
		try {
			const res = await axios.get(`/api/user/${userId}`)
			this.setState({ user: res.data })
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		if (!this.state.user) return null
		const userId = this.props.match.params.id
		const user = this.state.user
		return (
			<section className='body-div bg-set-1'>
				<div className='body-presets bg-grad'>
					<h1 className='title-head font text-center m-0 pb-2'>Profile</h1>

					<div className='grid'>
						<div className='col-md-3 col-sm-12'>
							<div className='center-item-screen'>
								<div className='text-center'>
									<img
										className='rounded-circle img-thumbnail'
										style={{ maxWidth: '200px' }}
										src={user.profile_image}
										alt={user.username}
									/>
									<p className='sub-head font m-0 pt-3 nowrap'>
										{user.first_name} {user.last_name}
									</p>
								</div>
							</div>
						</div>
						<div className='row mt-2'>
							<div className='m-2'>
								<p className='content-preset sub-font text-justify'>
									{user.bio}
								</p>
							</div>
							<div className='p-2 col'>
								<h3 className='sub-head font'>Wish List</h3>

								<div className='center-item-screen row'>
									{user.wish_list.map((item) => (
										<Card className='m-3' style={{ width: '13rem' }}>
											<Card.Img
												style={{ height: '50%' }}
												variant='top'
												src={item.image}
											/>
											<Card.Body>
												<Card.Title className='text-center text-uppercase'>
													{item.title}
												</Card.Title>
												<div className='center-item-screen'>
													<Button variant='dark' href={`/events/${item.id}`}>
														View Event
													</Button>
												</div>
											</Card.Body>
										</Card>
									))}
								</div>
							</div>
						</div>

						<div className='center-item-screen'>
							{this.isOwner() && (
								<Link to={`/user/${userId}/amend`}>
									<button
										className='btn btn-outline-light btn-presets'
										type='submit'
									>
										Account Settings
									</button>
								</Link>
							)}
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default UserView
