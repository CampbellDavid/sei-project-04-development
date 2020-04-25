import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Logo from '../../assets/logo.png'
import ImgOne from '../../assets/home/img-1.png'
import ImgTwo from '../../assets/home/img-2.png'
import ImgThree from '../../assets/home/img-3.png'
import ImgFour from '../../assets/home/img-4.png'
import ImgFive from '../../assets/home/img-5.png'
import SubImg from '../../assets/home/sub-img.png'

const Home = () => (
	<section className='home-page body-div'>
		<div className='center-item-screen'>
			<img src={Logo} alt='Logo' className='home-logo' />
		</div>
		<div
			style={{
				backgroundColor: '#000',
			}}
		>
			<div class='container-fluid'>
				<div className='row'>
					<div className='col-xl-7 p-0'>
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
									alt='Second slide'
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
					<div className='col-xl-5 p-0'>
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

					<div className='row'>
						<div className='col-xl-8 bg-dark'>
							<div className='p-3'>
								<div className='font text-justify'>
									<h3>Featured Event: Yosemite Rock Climbing</h3>
									<p>
										Ullamco commodo laboris exercitation irure reprehenderit.
										Incididunt velit ipsum commodo aliqua ad est tempor ea. Do
										ea pariatur qui tempor sit veniam laboris. Officia sunt
										irure veniam occaecat quis mollit deserunt deserunt. Sunt
										velit adipisicing enim dolor occaecat magna quis dolor
										aliquip quis Lorem. Laborum occaecat elit consequat laboris
										consequat consectetur pariatur excepteur do nostrud.
									</p>
								</div>
								<div className='font text-justify'>
									<p>
										Est ad excepteur eu ut velit tempor. In commodo adipisicing
										eu nostrud. Velit et proident aute voluptate aute sunt.
									</p>
								</div>
							</div>
						</div>
						<div className='col-xl-4 bg-dark'>
							<div>
								<img src={SubImg} alt='Yosemite' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
)

export default Home
