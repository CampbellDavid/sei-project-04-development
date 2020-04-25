import React from 'react'

const EventForm = ({ data, handleChange, handleSubmit }) => {
	console.log(data)
	return (
		<section className='main-body'>
			<h1 className='main-heading'>Event</h1>
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
							placeholder='Sport'
							name='sport'
							id='sport'
							// value={data.sport} - needs to be drop down list of existing events
						/>
						<label htmlFor='sport' className='main-form-label'>
							Sport
						</label>
					</div>
					<hr className='divider' />
					<div className='button-div'>
						<button className='button is-rounded' type='submit'>
							Submit
						</button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default EventForm
