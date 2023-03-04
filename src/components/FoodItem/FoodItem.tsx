import { useContext } from 'react';
import { AddToCartIcon } from '../../assets/AddToCartIcon';
import { AddToFavIcon } from '../../assets/AddToFavIcon';
import { ItemData } from '../../pages/HomePage';
import CartContext from '../../store/CartContext';
import './FoodItem.scss';

const FoodItem = (props: ItemData) => {
	const cartCtx = useContext(CartContext);

	const cartItemAddHandler = (item: ItemData) => {
		cartCtx.addItem({ ...item, unit: 1 });
	};

	const addingToWishList = (item: string) => {};

	return (
		<div className="food-item-con">
			<img src={props.img} alt={props.name} />
			<div className="right-column">
				<div className="desc-column">
					<h2>{props.name}</h2>
					<p>{props.description}</p>
				</div>
				<div className="add-cart-column">
					<div className={props.available >= 10 ? 'quantity-con more-than-5' : 'quantity-con less-than-5'}>
						<p>{props.available >= 10 ? 'Available' : `Only ${props.available} left`}</p>
					</div>
					<div className="icons-price-column">
						<h2>{props.price}</h2>
						<div className="icons-column">
							<button onClick={() => cartItemAddHandler(props)}>
								<AddToCartIcon />
							</button>
							<button onClick={() => addingToWishList(props.name)}>
								<AddToFavIcon />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FoodItem;
