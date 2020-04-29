import React from 'react'
import { Card, Button } from 'react-bootstrap'

const SportCard = ({ id, name, image }) => (
	<Card className='m-3' style={{ width: '13rem' }}>
		<Card.Img style={{ height: '50%' }} variant='top' src={image} />
		<Card.Body>
			<Card.Title className='text-center text-uppercase'>{name}</Card.Title>
		</Card.Body>
		<Card.Footer>
			<div className='center-item-screen'>
				<Button variant='dark' href={`sports/${id}`}>
					View Sport
				</Button>
			</div>
		</Card.Footer>
	</Card>
)
export default SportCard
