import React from 'react'

const UserForm = ({ user, handleChange, handleSubmit }) => {
	return (
		<div className='bg-set-10'>
			<div className='bg-grad'>
				<section className='form-body mt-5 pt-5'>
					<div className='center-item-screen'>
						<h1 className='title-head font'>User Settings</h1>
					</div>

					<form onSubmit={handleSubmit}>
						<div className='main-form-group'>
							<input
								className='main-user-form-field'
								onChange={handleChange}
								placeholder='Email'
								name='email'
								id='email'
								value={user.email}
							/>
						</div>

						<div className='main-form-group'>
							<input
								className='main-user-form-field'
								onChange={handleChange}
								placeholder='First Name'
								name='first_name'
								id='first_name'
								value={user.first_name}
							/>
						</div>

						<div className='main-form-group'>
							<input
								className='main-user-form-field'
								onChange={handleChange}
								placeholder='Last Name'
								name='last_name'
								id='last_name'
								value={user.last_name}
							/>
						</div>

						<div className='main-form-group'>
							<textarea
								className='main-user-form-field'
								rows='5'
								cols='30'
								maxLength='1000'
								onChange={handleChange}
								placeholder='Bio'
								name='bio'
								id='bio'
								style={{ resize: 'none' }}
								value={user.bio}
							/>
						</div>

						<div className='main-form-group'>
							<input
								className='main-user-form-field'
								onChange={handleChange}
								placeholder='Sex'
								name='sex'
								id='sex'
								value={user.sex}
							/>
						</div>

						<div className='main-form-group'>
							<input
								className='main-user-form-field'
								onChange={handleChange}
								placeholder='Profile Image URL'
								name='profile_image'
								id='profile_image'
								value={user.profile_image}
							/>
						</div>

						<div className='main-form-group'>
							<input
								className='main-user-form-field'
								onChange={handleChange}
								type='password'
								placeholder='New Password'
								name='password'
								id='password'
							/>
						</div>

						<div className='main-form-group'>
							<input
								className='main-user-form-field'
								onChange={handleChange}
								type='password'
								placeholder='Confirm New Password'
								name='password_confirmation'
								id='password_confirmation'
							/>
						</div>

						<div className='p-4 center-item-screen'>
							<button
								className='btn btn-outline-light btn-presets'
								type='submit'
							>
								Submit
							</button>
						</div>
					</form>
				</section>
			</div>
		</div>
	)
}

export default UserForm
