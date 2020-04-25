import React from 'react'

const GroupForm = ({ handleChange, handleSubmit }) => {
	return (
		<section className='main-body'>
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

export default GroupForm
