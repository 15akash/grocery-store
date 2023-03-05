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

const coffeDetails = {
	available: 100,
	description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
	img: 'https://py-shopping-cart.s3.eu-west-2.amazonaws.com/coffee.jpeg',
	name: 'Coffee',
	price: '£0.65',
	rating: 3.5,
	type: 'drinks',
	unit: 1
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
		const discountedItemPrice = action.discount?.price.slice(1, action.discount?.price.length);
		const discountedPriceToAdd = +discountedItemPrice;

		const updatedTotalAmount = state.totalAmount + priceToAdd * action.item.unit + (!!discountedPriceToAdd ? discountedPriceToAdd : 0);
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

		if (action.discount) {
			const existingItemToOffer = updatedItems.findIndex((item: any) => item.name === action.discount.name);
			if (existingItemToOffer > 0) {
				const itemToUpdate = { ...updatedItems[existingItemToOffer], unit: updatedItems[existingItemToOffer].unit + action.discount.unit };
				updatedItems = [...updatedItems];
				updatedItems[existingItemToOffer] = itemToUpdate;
			} else updatedItems = [...updatedItems, action.discount];
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
			totalUnits: state.totalUnits + 1 + (!!action.discount?.unit ? 1 : 0),
			totalDiscount: state.totalDiscount + discount + (!!discountedPriceToAdd ? discountedPriceToAdd : 0)
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
			// if (action.name === 'Croissants') {
			// 	const findCroissants = state.items.find((t: CartItems) => t.name === 'Croissants');
			// 	if (findCroissants !== undefined) {
			// 		const unitsToGetDiscountOnCroissants = findCroissants.unit / 3;
			// 		if (action.name === 'Croissants' && Number.isInteger(unitsToGetDiscountOnCroissants)) {
			// 			discount = 0.65;
			// 		}
			// 	}
			// }
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

		if (action.discount) {
			console.log('in action', action.discount);
			const existingDiscountItemIndex = state.items.findIndex((item: { name: any }) => item.name === 'Coffee');
			const existingDiscountItem = state.items[existingDiscountItemIndex];
			if (existingDiscountItem.unit === 1) {
				updatedItems = state.items.filter((item: { name: any }) => item.name !== action.discount.name);
			} else {
				const updatedItem = { ...existingDiscountItem, unit: existingDiscountItem.unit - 1 };
				updatedItems = [...updatedItems];
				updatedItems[existingDiscountItem] = updatedItem;
			}
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
			totalUnits: state.totalUnits - 1 - (!!action.discount?.unit ? 1 : 0),
			totalDiscount: state.totalDiscount - discount - (!!action.discount?.unit ? 0.65 : 0)
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
		const findCroissants = cartContext.items.find((t: any) => t.name === 'Croissants');
		if (Number.isInteger((findCroissants?.unit + 1) / 3)) {
			dispatchCartAction({ type: 'ADD', item: item, discount: coffeDetails });
		} else dispatchCartAction({ type: 'ADD', item: item });
	};

	const removeItemFromCartHandler = (name: any) => {
		const findCroissants = cartContext.items.find((t: any) => t.name === 'Croissants');
		if (Number.isInteger(findCroissants?.unit / 3)) {
			dispatchCartAction({ type: 'REMOVE', name: name, discount: coffeDetails });
		} else dispatchCartAction({ type: 'REMOVE', name: name });
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
