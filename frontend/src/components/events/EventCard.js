import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import { Card, Button } from 'react-bootstrap'

const currency = new Intl.NumberFormat('en-GB', {
	style: 'currency',
	currency: 'GBP',
	minimumFractionDigits: 2,
})

const EventCard = ({
	id,
	title,
	location,
	image,
	price,
	time_and_date,
	description,
}) => (
	<Card className='m-3' style={{ width: '18rem' }}>
		<Card.Img variant='top' src={image} />
		<Card.Body>
			<Card.Title>{title}</Card.Title>
			<Card.Text className='text-justify' style={{ fontSize: '12px' }}>
				{description}
			</Card.Text>
			<Card.Subtitle className='pt-2 pb-2'>{location}</Card.Subtitle>
			<Card.Subtitle className='pt-2 pb-2'>
				{currency.format(price)}
			</Card.Subtitle>
			<Card.Subtitle className='pt-2 pb-2'>
				{Moment(time_and_date).format('lll')}
			</Card.Subtitle>
			<div className='center-item-screen'>
				<Button variant='dark' href={`events/${id}`}>
					View Event
				</Button>
			</div>
		</Card.Body>
	</Card>
)

export default EventCard
