import React from "react";

import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import "./Header.styles.css";

function Header() {
	return (
		<div className="header">
			{/* Amazon Logo */}
			<img
				className="header__logo"
				src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
				alt="Amazon Logo"
			/>

			{/* Search Input */}
			<div className="header__search">
				<input className="header__searchInput" type="text" />
                {/* Search Icon */}
                <SearchIcon className="header__searchIcon" />
			</div>

			{/* Nav Bar */}
			<div className="header__nav">
                {/* Hello option */}
                <div className="header__option">
                    <span className="header__optionLineOne">Hello Guest</span>
                    <span className="header__optionLineTwo">Sign In</span>
                </div>
                {/* Orders */}
                <div className="header__option">
                    <span className="header__optionLineOne">Returns</span>
                    <span className="header__optionLineTwo">& Orders</span>
                </div>
                {/* Prime */}
                <div className="header__option">
                    <span className="header__optionLineOne">Your</span>
                    <span className="header__optionLineTwo">Prime</span>
                </div>
                {/* Cart */}
                <div className="header__optionBasket">
                    <ShoppingBasketIcon />
                    <span className="header__optionLineTwo header__basketCount">0</span>
                </div>
            </div>
		</div>
	);
}

export default Header;
