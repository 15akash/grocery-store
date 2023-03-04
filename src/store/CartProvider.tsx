import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useReducer } from 'react';
import CartContext from './CartContext';

interface StateObject {
	items: any;
	totalAmount: number;
	totalUnits: number;
}

const defaultCartState = {
	items: [],
	totalAmount: 0,
	totalUnits: 0
};

const cartReducer = (state: StateObject, action: any) => {
	if (action.type === 'ADD') {
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
			totalUnits: state.totalUnits + 1
		};
	}
	if (action.type === 'REMOVE') {
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
			totalUnits: state.totalUnits - 1
		};
	}

	if (action.type === 'CANCEL') {
		let updatedItems = state.items.filter((item: { name: any }) => item.name !== action.item.name);
		const trimPrice = action.item.price.slice(1, action.item.price.length);
		const priceToDeduct = +trimPrice;
		const updatedAmount = state.totalAmount - action.item.unit * priceToDeduct;

		return {
			items: updatedItems,
			totalAmount: updatedAmount,
			totalUnits: state.totalUnits - action.item.unit
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
		totalUnits: cartState.totalUnits
	};

	return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
