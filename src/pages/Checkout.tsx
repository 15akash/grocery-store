import { useContext } from 'react';
import './Checkout.scss';
import CheckoutItems from '../components/Checkout-Items/CheckoutItems';
import CartContext from '../store/CartContext';

const Checkout = () => {
	const cartCtx = useContext(CartContext);

	const getPoundSign = cartCtx.items[0]?.price.slice(0, 1) ?? '';

	return (
		<div className="checkout-con">
			<h1>Checkout</h1>
			<CheckoutItems />
			<div className="amount-column">
				<div className="amount-discount-column">
					<h4>SubTotal</h4>
					<p>{`${getPoundSign} ${cartCtx.totalAmount.toFixed(2)}`}</p>
				</div>
				<div className="amount-discount-column">
					<h4>Discount</h4>
					<p>{`${getPoundSign} ${cartCtx.totalDiscount.toFixed(2)}`}</p>
				</div>
				<div className="amount-discount-column">
					<h4>Total</h4>
					<p>{`${getPoundSign} ${(cartCtx.totalAmount - cartCtx.totalDiscount).toFixed(2)}`}</p>
					<button className="checkout-btn desktop-view">Checkout</button>
				</div>
				<button className="checkout-btn mobile-view">Checkout</button>
			</div>
		</div>
	);
};

export default Checkout;
