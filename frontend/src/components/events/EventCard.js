import React from 'react'
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
	<Card className='m-3' style={{ width: '18rem', height: '30rem' }}>
		<Card.Img style={{ height: '35%' }} variant='top' src={image} />
		<Card.Body className='d-flex flex-column'>
			<Card.Title>{title}</Card.Title>
			<Card.Text
				className='text-justify'
				style={{ fontSize: '12px', overflowX: 'hidden' }}
			>
				{description}
			</Card.Text>
			<div className='mt-auto'>
				<Card.Subtitle className='pt-2 pb-2'>{location}</Card.Subtitle>
				<Card.Subtitle className='pt-2 pb-2'>
					{currency.format(price)}
				</Card.Subtitle>
				<Card.Subtitle className='pt-2 pb-2'>
					{Moment(time_and_date).format('lll')}
				</Card.Subtitle>
			</div>
		</Card.Body>
		<Card.Footer>
			<div className='center-item-screen'>
				<Button variant='dark' href={`events/${id}`}>
					View Event
				</Button>
			</div>
		</Card.Footer>
	</Card>
)

export default EventCard
