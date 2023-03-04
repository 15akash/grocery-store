import { useContext } from 'react';
import './Checkout.scss';
import CheckoutItems from '../components/Checkout-Items/CheckoutItems';
import CartContext from '../store/CartContext';

const Checkout = () => {
	const cartCtx = useContext(CartContext);
	return (
		<div className="checkout-con">
			<h1>Checkout</h1>
			<CheckoutItems />
			<div className="amount-column">
				<div className="amount-discount-column">
					<h4>SubTotal</h4>
					<p>{`Pound ${cartCtx.totalAmount}`}</p>
				</div>
				<div className="amount-discount-column">
					<h4>Discount</h4>
					<p>{`Pound ${cartCtx.totalDiscount}`}</p>
				</div>
				<div className="amount-discount-column">
					<h4>Total</h4>
					<p>{`Pound ${cartCtx.totalAmount - cartCtx.totalDiscount}`}</p>
					<button className="checkout-btn">Checkout</button>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
