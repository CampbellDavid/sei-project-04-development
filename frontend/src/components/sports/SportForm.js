import React from 'react'

const SportForm = ({ sport, handleChange, handleSubmit }) => {
	console.log(sport)
	return (
		<section className='main-body'>
			<div>
				<h1 className='main-heading'>Sport</h1>
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
						<div className='button-div'>
							<button className='button is-rounded' type='submit'>
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
