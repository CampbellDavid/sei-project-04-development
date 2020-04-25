import React from 'react'
import Background from '../../assets/hero.jpg'

const sectionStyle = {
	width: '100%',
	backgroundImage: `url(${Background})`,
	backgroundRepeat: 'no-repeat',
	backgroundAttachment: 'fixed',
	backgroundSize: 'cover'
}

const Home = () => (
	<body className='has-navbar-fixed-top'>
		<section style={sectionStyle} className='hero is-fullheight-with-navbar'>
			<div className='container'>
				<div className='text-container'>
					<h1 className='heading-hero'>EXTREME Meet Up</h1>
					<h2 className='slogan-hero'>Destroy your fear.</h2>
				</div>
			</div>
		</section>
	</body>
)

export default Home
