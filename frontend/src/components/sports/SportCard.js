import React from 'react'
import { Card, Button } from 'react-bootstrap'

const SportCard = ({ id, name, image }) => (
	<Card className='m-3' style={{ width: '18rem' }}>
		<Card.Img variant='top' src={image} />
		<Card.Body>
			<Card.Title>{name}</Card.Title>
			<div className='center-item-screen'>
				<Button variant='dark' href={`sports/${id}`}>
					View Sport
				</Button>
			</div>
		</Card.Body>
	</Card>
)
export default SportCard
