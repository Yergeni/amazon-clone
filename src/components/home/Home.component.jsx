import React from "react";
import Product from "../product/Product.component";

import "./Home.styles.css";

function Home() {
	return (
		<div className="home">
			<div className="home__container">
				<img
					className="home__image"
					// src="
					//     https://m.media-amazon.com/images/G/01//digital/video/merch/2019/Other/RB-0969_SVOD_MLP_Refresh/SVOD_MLP_T4._SY1200_FMJPG_.jpg"
					src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
					alt="Prime Video"
				/>
				<div className="home__row">
					<Product
						id="1"
						title="Letsfit Smart Watch, Fitness Tracker with Heart Rate Monitor, Activity Tracker with 1.3 inches Touch Screen"
						price={30.59}
						image="https://images-na.ssl-images-amazon.com/images/I/61WKkuufjBL._AC_SL1500_.jpg"
						rating={3}
					/>
					<Product
						id="2"
						title="Beats Solo Pro Wireless Noise Cancelling On-Ear Headphones"
						price={299.95}
						image="https://images-na.ssl-images-amazon.com/images/I/51KIxln4kxL._AC_SL1000_.jpg"
						rating={5}
					/>
				</div>
				<div className="home__row">
					<Product
						id="3"
						title="LET'S GO! Binocular for Kids"
						price={15.99}
						image="https://images-na.ssl-images-amazon.com/images/I/61xljyjdv6L._AC_SX425_.jpg"
						rating={4}
					/>
					<Product
						id="4"
						title="Night Owl CCTV Video Home Security Camera System with 4 Wired 1080p HD"
						price={249.99}
						image="https://images-na.ssl-images-amazon.com/images/I/61HpmWIR1RL._AC_SL1500_.jpg"
						rating={5}
					/>
					<Product
						id="5"
						title="Memory Card Micro SD Card 1024GB MicroSDHC TF Card"
						price={45.99}
						image="https://images-na.ssl-images-amazon.com/images/I/61iHLqysYyL._AC_SL1412_.jpg"
						rating={2}
					/>
				</div>
				<div className="home__row">
					<Product
						id="6"
						title="All-New Toshiba 32LF221U21 32-inch Smart HD 720p TV - Fire TV Edition, Released 2020"
						price={179.99}
						image="https://images-na.ssl-images-amazon.com/images/I/61x0OuU9XtL._AC_SL1000_.jpg"
						rating={4}
						quantity={0}
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;
