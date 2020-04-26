import React from 'react'

const EventForm = ({ data, sportOps, handleChange, handleSubmit }) => {
	return (
		<div className='bg-set-7'>
			<div className='bg-grad'>
				<section className='form-body'>
					<div className='body-presets'>
						<div className='center-item-screen'>
							<h1 className='title-head font'>Event</h1>
						</div>
						<div className='form-wrapper'>
							<form onSubmit={handleSubmit}>
								<div className='main-form-group'>
									<input
										className='main-form-field'
										onChange={handleChange}
										placeholder='Event Title'
										name='title'
										id='title'
										value={data.title}
										required
									/>
									<label htmlFor='title' className='main-form-label'>
										Event Title
									</label>
								</div>

								<div className='main-form-group'>
									<input
										className='main-form-field'
										type='number'
										onChange={handleChange}
										placeholder='Price'
										name='price'
										id='price'
										value={data.price}
										required
									/>
									<label htmlFor='price' className='main-form-label'>
										Price
									</label>
								</div>

								<div className='main-form-group'>
									<input
										className='main-form-field'
										onChange={handleChange}
										placeholder='Time & Date'
										type='datetime-local'
										name='time_and_date'
										id='time_and_date'
										value={data.time_and_date}
										required
									/>
									<label htmlFor='time_and_date' className='main-form-label'>
										Time & Date
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
										value={data.description}
										required
									/>
								</div>

								<div className='main-form-group'>
									<input
										className='main-form-field'
										onChange={handleChange}
										placeholder='Location'
										name='location'
										id='location'
										value={data.location}
										required
									/>
									<label htmlFor='location' className='main-form-label'>
										Location
									</label>
								</div>

								<div className='main-form-group'>
									<input
										className='main-form-field'
										onChange={handleChange}
										placeholder='Image'
										name='image'
										id='image'
										value={data.image}
										required
									/>
									<label htmlFor='image' className='main-form-label'>
										Image
									</label>
								</div>

								<div className='main-form-group'>
									<select
										className='main-form-field'
										onChange={handleChange}
										placeholder='Sport'
										name='sport'
										id='sport'
										defaultValue='choose-sport'
									>
										<option value='choose-sport' disabled>
											Please select a sport
										</option>
										{sportOps.map((option) => {
											return <option value={option.id}>{option.name}</option>
										})}
									</select>
									<label htmlFor='sport' className='main-form-label'>
										Sport
									</label>
								</div>

								<div className='center-item-screen'>
									<button
										type='submit'
										className='btn btn-outline-light btn-presets mt-5'
									>
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}

export default EventForm
