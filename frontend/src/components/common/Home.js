import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Logo from '../../assets/logo.png'
import ImgOne from '../../assets/home/img-1.png'
import ImgTwo from '../../assets/home/img-2.png'
import ImgThree from '../../assets/home/img-3.png'
import ImgFour from '../../assets/home/img-4.png'
import ImgFive from '../../assets/home/img-5.png'

const Home = () => (
	<body className='has-navbar-fixed-top'>
		<div className='container-home'>
			<div className='carousel-div'>
				<Carousel>
					<Carousel.Item>
						<img className='d-block w-100' src={ImgOne} alt='First slide' />
					</Carousel.Item>
					<Carousel.Item>
						<img className='d-block w-100' src={ImgTwo} alt='Third slide' />
					</Carousel.Item>
					<Carousel.Item>
						<img className='d-block w-100' src={ImgThree} alt='Third slide' />
					</Carousel.Item>
					<Carousel.Item>
						<img className='d-block w-100' src={ImgFour} alt='Third slide' />
					</Carousel.Item>
					<Carousel.Item>
						<img className='d-block w-100' src={ImgFive} alt='Third slide' />
					</Carousel.Item>
				</Carousel>
			</div>
		</div>
	</body>
)

export default Home
