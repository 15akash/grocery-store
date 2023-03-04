import { AddToCartIcon } from '../../assets/AddToCartIcon';
import { AddToFavIcon } from '../../assets/AddToFavIcon';
import { ItemData } from '../../pages/HomePage';
import './FoodItem.scss';

const FoodItem = (props: ItemData) => {
	return (
		<div className="food-item-con">
			<img src={props.img} alt={props.name} />
			<div className="right-column">
				<div className="desc-column">
					<h2>{props.name}</h2>
					<p>{props.description}</p>
				</div>
				<div className="add-cart-column">
					<h2>{props.price}</h2>
					<div className="icons-column">
						<AddToCartIcon />
						<AddToFavIcon />
					</div>
				</div>
			</div>
		</div>
	);
};

export default FoodItem;
