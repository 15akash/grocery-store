import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useReducer } from 'react';
import { CartItems } from '../components/Checkout-Items/CheckoutItems';
import CartContext from './CartContext';

interface StateObject {
	items: any;
	totalAmount: number;
	totalUnits: number;
	totalDiscount: number;
}

const defaultCartState = {
	items: [],
	totalAmount: 0,
	totalUnits: 0,
	totalDiscount: 0
};

const cartReducer = (state: StateObject, action: any) => {
	if (action.type === 'ADD') {
		let discount: number = 0;
		if (state.items.length > 0 && (action.item.name === 'Coca-Cola' || action.item.name === 'Croissants')) {
			const findCocaCola = state.items.find((t: CartItems) => t.name === 'Coca-Cola');
			if (findCocaCola !== undefined) {
				const unitsToGetDiscountOnCocaCola = (findCocaCola.unit + 1) / 6;
				if (action.item.name === 'Coca-Cola' && Number.isInteger(unitsToGetDiscountOnCocaCola)) {
					discount = 0.99;
				}
			}
		}
		const trimPrice = action.item.price.slice(1, action.item.price.length);
		const priceToAdd = +trimPrice;
		const updatedTotalAmount = state.totalAmount + priceToAdd * action.item.unit;
		const existingCartItemIndex = state.items.findIndex((item: { name: string }) => item.name === action.item.name);
		const existingCartItem = state.items[existingCartItemIndex];
		let updatedItems;

		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				unit: existingCartItem.unit + action.item.unit
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
			totalUnits: state.totalUnits + 1,
			totalDiscount: state.totalDiscount + discount
		};
	}
	if (action.type === 'REMOVE') {
		let discount: number = 0;
		if (action.name === 'Coca-Cola' || action.name === 'Croissants') {
			if (action.name === 'Coca-Cola') {
				const findCocaCola = state.items.find((t: CartItems) => t.name === 'Coca-Cola');
				if (findCocaCola !== undefined) {
					const unitsToGetDiscountOnCocaCola = findCocaCola.unit / 6;
					if (action.name === 'Coca-Cola' && Number.isInteger(unitsToGetDiscountOnCocaCola)) {
						discount = 0.99;
					}
				}
			}
		}
		const existingCartItemIndex = state.items.findIndex((item: { name: any }) => item.name === action.name);
		const existingItem = state.items[existingCartItemIndex];
		const trimPrice = existingItem.price.slice(1, existingItem.price.length);
		const priceToDeduct = +trimPrice;
		const updatedTotalAmount = state.totalAmount - priceToDeduct;
		let updatedItems;
		if (existingItem.unit === 1) {
			updatedItems = state.items.filter((item: { name: any }) => item.name !== action.name);
		} else {
			const updatedItem = { ...existingItem, unit: existingItem.unit - 1 };
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
			totalUnits: state.totalUnits - 1,
			totalDiscount: state.totalDiscount - discount
		};
	}

	if (action.type === 'CANCEL') {
		let updatedItems = state.items.filter((item: { name: string }) => item.name !== action.item.name);
		const trimPrice = action.item.price.slice(1, action.item.price.length);
		const priceToDeduct = +trimPrice;
		const updatedAmount = state.totalAmount - action.item.unit * priceToDeduct;

		return {
			items: updatedItems,
			totalAmount: updatedAmount,
			totalUnits: state.totalUnits - action.item.unit,
			totalDiscount: 0
		};
	}

	return defaultCartState;
};

const CartProvider = (props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined }) => {
	const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

	const addItemToCartHandler = (item: any) => {
		dispatchCartAction({ type: 'ADD', item: item });
	};

	const removeItemFromCartHandler = (name: any) => {
		dispatchCartAction({ type: 'REMOVE', name: name });
	};

	const cancelItemFromCartHandler = (item: any) => {
		dispatchCartAction({ type: 'CANCEL', item });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
		cancelItem: cancelItemFromCartHandler,
		totalUnits: cartState.totalUnits,
		totalDiscount: cartState.totalDiscount
	};

	return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
