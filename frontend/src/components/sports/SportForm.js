import React from 'react'

const SportForm = ({ sport, handleChange, handleSubmit }) => {
	console.log(sport)
	return (
		<section className='bg-black form-body'>
			<div className='body-presets'>
				<div className='center-item-screen'>
					<h1 className='title-head font'>Sport</h1>
				</div>
				<div className='form-wrapper'>
					<form onSubmit={handleSubmit}>
						<div className='main-form-group'>
							<input
								className='main-form-field'
								onChange={handleChange}
								placeholder='Name'
								name='name'
								id='name'
								value={sport.name}
								required
							/>
							<label htmlFor='name' className='main-form-label'>
								Name
							</label>
						</div>

						<div className='main-form-group'>
							<input
								className='main-form-field'
								onChange={handleChange}
								placeholder='Image'
								name='image'
								id='image'
								value={sport.image}
								required
							/>
							<label htmlFor='image' className='main-form-label'>
								Image URL
							</label>
						</div>

						<div className='main-form-group'>
							<textarea
								className='main-user-form-field'
								rows='5'
								cols='30'
								onChange={handleChange}
								placeholder='Description'
								name='description'
								id='description'
								value={sport.description}
								required
							/>
						</div>

						<hr className='divider' />
						<div className='center-item-screen'>
							<button
								type='submit'
								className='btn btn-outline-light btn-presets'
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}

export default SportForm
