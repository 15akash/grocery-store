import { useContext } from 'react';
import { CrossIcon } from '../../assets/CrossIcon';
import { MinusIcon } from '../../assets/MinusIcon';
import { PlusIcon } from '../../assets/PlusIcon';
import { ItemData } from '../../pages/HomePage';
import CartContext from '../../store/CartContext';
import './CheckoutItem.scss';

interface CartItems extends ItemData {
	unit: number;
}

const CheckoutItems = () => {
	const cartCtx = useContext(CartContext);

	const addItemHandler = (item: any) => {
		cartCtx.addItem({ ...item, unit: 1 });
	};

	const removeItemHandler = (item: string) => {
		cartCtx.removeItem(item);
	};

	const cancelItemHandler = (item: any) => {
		cartCtx.cancelItem(item);
	};

	return (
		<div className="checkout-item-con">
			{cartCtx.items.map((item: CartItems) => {
				return (
					<div className="single-item-con" key={item.name}>
						<div className="product-details-con">
							<img src={item.img} alt={item.img} />
							<div>
								<h3>{item.name}</h3>
								<p>{`Product code: ${item.type}`}</p>
							</div>
						</div>
						<div className="product-price-con">
							<div>
								<div className="plus-minus-con">
									<button onClick={() => removeItemHandler(item.name)}>
										<MinusIcon />
									</button>
									<h4>{item.unit}</h4>
									<button onClick={() => addItemHandler(item)}>
										<PlusIcon />
									</button>
								</div>
								<div className="price-con">
									<p>{item.price}</p>
									<button onClick={() => cancelItemHandler(item)}>
										<CrossIcon />
									</button>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default CheckoutItems;
