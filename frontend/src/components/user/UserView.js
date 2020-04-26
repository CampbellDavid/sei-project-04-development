import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
// import image from "../../assets/user-bg.jpg"

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
			<section className='bg-black body-div'>
				<div className='body-presets'>
					<h1 className='title-head font'>Profile</h1>
					<div className='meta-container'>
						<div className='grid'>
							<div className='row'>
								<div className='float-left'>
									<div className='container-fluid text-center'>
										<img
											className='pro-img m-0'
											src={user.profile_image}
											alt={user.username}
										/>
										<p className='sub-head font ml-0 mr-0 mb-0 mt-3'>
											{user.first_name} {user.last_name}
										</p>
									</div>
								</div>
							</div>
							<div className='row mt-2'>
								<div className='main-data pr-5'>
									<div className='mr-4 pr-4'>
										<p className='content-preset sub-font text-justify'>
											{user.bio}
										</p>
									</div>
									<span className='content-preset sub-font'>Wish List: </span>
									{user.wish_list.map((item) => (
										<p className='content-preset sub-font' key={item.title}>
											<Link to={`/events/${item.id}`}>{item.title}</Link>
										</p>
									))}
								</div>
								<div className='p-0'>
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
					</div>
				</div>
			</section>
		)
	}
}

export default UserView
