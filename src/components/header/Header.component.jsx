import React from "react";
import { Link } from "react-router-dom";

// Context
import { useStateValue } from "../../state/providers/State.provider";

import { auth } from "../../firebase";

import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

import { getBasketNumberOfItems } from "../../state/utils/basket.utils";

import "./Header.styles.css";

function Header() {
	const [{ basket, user }] = useStateValue();

	const handleSignOut = () => {
		auth.signOut();
	};

	return (
		<div className="header">
			{/* Amazon Logo */}
			<Link to="/">
				<img
					className="header__logo"
					src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
					alt="Amazon Logo"
				/>
			</Link>

			{/* Search Input */}
			<div className="header__search">
				<input className="header__searchInput" type="text" />
				{/* Search Icon */}
				<SearchIcon className="header__searchIcon" />
			</div>

			{/* Nav Bar */}
			<div className="header__nav">
				{/* Hello option */}
				{/* Nice handle on link */}
				<Link to={!user ? "/login" : "#"}>
					<div onClick={handleSignOut} className="header__option">
						<span className="header__optionLineOne">
							{user?.email || "Hello Guest"}
						</span>
						<span className="header__optionLineTwo">
							{user ? "Sign Out" : "Sign In"}
						</span>
					</div>
				</Link>

				{/* Orders */}
				<Link to='/orders'>
					<div className="header__option">
						<span className="header__optionLineOne">Returns</span>
						<span className="header__optionLineTwo">& Orders</span>
					</div>
				</Link>

				{/* Prime */}
				<div className="header__option">
					<span className="header__optionLineOne">Your</span>
					<span className="header__optionLineTwo">Prime</span>
				</div>

				{/* Cart */}
				<Link to="/checkout">
					<div className="header__optionBasket">
						<ShoppingBasketIcon />
						<span className="header__optionLineTwo header__basketCount">
							{getBasketNumberOfItems(basket)}
						</span>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Header;
