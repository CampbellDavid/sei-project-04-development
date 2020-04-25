import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Logo from '../../assets/logo.png'
import ImgOne from '../../assets/home/img-1.png'
import ImgTwo from '../../assets/home/img-2.png'
import ImgThree from '../../assets/home/img-3.png'
import ImgFour from '../../assets/home/img-4.png'
import ImgFive from '../../assets/home/img-5.png'

const Home = () => (
	<div className='has-navbar-fixed-top'>
		<div
			className='container-home body-div'
			style={{
				backgroundColor: '#000',
			}}
		>
			<div class='container-fluid'>
				<div className='row'>
					<div className='col-md-8 p-0'>
						<Carousel>
							<Carousel.Item>
								<img
									className='d-block w-100 carousel-item-img'
									src={ImgOne}
									alt='First slide'
								/>
							</Carousel.Item>
							<Carousel.Item>
								<img
									className='d-block w-100 carousel-item-img'
									src={ImgTwo}
									alt='Third slide'
								/>
							</Carousel.Item>
							<Carousel.Item>
								<img
									className='d-block w-100 carousel-item-img'
									src={ImgThree}
									alt='Third slide'
								/>
							</Carousel.Item>
							<Carousel.Item>
								<img
									className='d-block w-100 carousel-item-img'
									src={ImgFour}
									alt='Fourth slide'
								/>
							</Carousel.Item>
							<Carousel.Item>
								<img
									className='d-block w-100 carousel-item-img'
									src={ImgFive}
									alt='Fifth slide'
								/>
							</Carousel.Item>
						</Carousel>
					</div>
					<div className='col-md-4 p-0'>
						<div className='p-3'>
							<div className='font text-justify'>
								<h2>About Us</h2>
								<p>
									Aute enim aliquip laboris culpa. Quis voluptate mollit
									exercitation cupidatat dolore anim velit dolore occaecat quis
									excepteur. Pariatur sint sint irure ipsum nostrud ad proident
									anim anim incididunt aliquip mollit esse proident. Dolore
									adipisicing ut ad eu culpa adipisicing voluptate anim enim eu.
									Incididunt anim ea tempor proident. Non nisi laboris fugiat
									incididunt ullamco in aliquip ex enim enim. Culpa cupidatat
									excepteur commodo sint excepteur sint.
								</p>
								<p>
									Fugiat id exercitation in sit exercitation esse. Esse
									incididunt culpa sit mollit ipsum dolor dolor. Eu excepteur
									laboris velit officia deserunt. Aliquip reprehenderit est
									tempor nostrud mollit culpa et minim cupidatat. Qui velit eu
									pariatur anim proident veniam.
								</p>
								<p>
									Nisi est do sit velit est ad pariatur occaecat in consequat
									labore. Sit do laborum adipisicing exercitation fugiat anim
									tempor occaecat duis voluptate commodo eu. Dolore commodo
									dolor pariatur elit ea reprehenderit mollit do.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
)

export default Home
