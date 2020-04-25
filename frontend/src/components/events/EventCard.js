import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment'

const currency = new Intl.NumberFormat('en-GB', {
	style: 'currency',
	currency: 'GBP',
	minimumFractionDigits: 2
})

const EventCard = ({
	id,
	sport,
	title,
	location,
	price,
	time_and_date,
	description
}) => (
	<Link to={`/events/${id}`}>
		<div className='event-card'>
			<h2 className='ev-card-title'>{title}</h2>
			<p className='ev-card-content'>{sport}</p>
			<p className='ev-card-content'>{location}</p>
			<p className='ev-card-content'>{currency.format(price)}</p>
			<p className='ev-card-content'>{Moment(time_and_date).format('lll')}</p>
			<p className='ev-card-content'>{description}</p>
		</div>
	</Link>
)
export default EventCard
