import { useReducer } from 'react';
import WishListContext from './WishListContext';

const defaultWishState = {
	items: []
};

const wishReducer = (state: any, action: any) => {
	if (action.type === 'TOGGLE') {
		let updatedItem;
		let existingItem = state.items.find((t: any) => t.name === action.item.name);
		if (existingItem !== undefined) {
			updatedItem = state.items.filter((t: any) => t.name !== existingItem.name);
		} else {
			updatedItem = state.items.concat(action.item);
		}
		return { items: updatedItem };
	}

	return defaultWishState;
};

const WishListProvider = (props: any) => {
	const [wishState, dispatchWishAction] = useReducer(wishReducer, defaultWishState);

	const toggleItemHandler = (item: any) => {
		dispatchWishAction({ type: 'TOGGLE', item });
	};

	const wishListContext = {
		items: wishState.items,
		toggleItem: toggleItemHandler
	};

	return <WishListContext.Provider value={wishListContext}>{props.children}</WishListContext.Provider>;
};

export default WishListProvider;
