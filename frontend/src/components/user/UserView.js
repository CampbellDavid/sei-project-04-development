import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
// import image from "../../assets/user-bg.jpg"

class UserView extends React.Component {
	state = {
		user: null
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
			<body className='has-navbar-fixed-top'>
				<section className='pro-body is-fullheight-with-navbar'>
					<div className='is-fullwidth top-div'></div>
					<div className='meta-container'>
						<div className='profile-container'>
							<div className='profile-card'>
								<div className='pro-img-div'>
									<img
										className='pro-img'
										src={user.profile_image}
										alt={user.username}
									/>
								</div>
								<hr className='divider-small' />
								<div className='profile-data'>
									<div className='main-data'>
										<p className='user-info'>
											{user.first_name} {user.last_name}
										</p>
										<hr className='divider-small' />
										<p className='user-info'>{user.sex}</p>
										<hr className='divider-small' />
										<p className='user-self-bio'>{user.bio}</p>
										<hr className='divider-small' />
										<span className='user-info'>Wish List: </span>
										{user.wish_list.map(item => (
											<p className='user-info' key={item.title}>
												{item.title}
											</p>
										))}
									</div>
									<hr className='divider-small' />
									{this.isOwner() && (
										<Link to={`/user/${userId}/amend`}>
											<button type='button' className='button is-rounded'>
												Account Settings
											</button>
										</Link>
									)}
								</div>
								<hr className='divider-small' />
							</div>
						</div>
					</div>
				</section>
			</body>
		)
	}
}

export default UserView
