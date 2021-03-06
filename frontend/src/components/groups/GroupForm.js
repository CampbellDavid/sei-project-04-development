import React from 'react'

const GroupForm = ({ handleChange, handleSubmit }) => {
	return (
		<div className='bg-set-15'>
			<div className='bg-grad'>
				<section className='form-body'>
					<div className='body-presets'>
						<div className='center-item-screen'>
							<h1 className='title-head font'>Group</h1>
						</div>
						<div className='form-wrapper'>
							<form onSubmit={handleSubmit}>
								<div className='main-form-group'>
									<input
										className='main-form-field'
										onChange={handleChange}
										placeholder='Group Name'
										name='group_name'
										id='group_name'
										required
									/>
									<label htmlFor='group_name' className='main-form-label'>
										Group Name
									</label>
								</div>

								<div className='center-item-screen p-4'>
									<button
										className='btn btn-outline-light btn-presets'
										type='submit'
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

export default GroupForm
