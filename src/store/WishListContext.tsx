import React from 'react';
import { ItemData } from '../pages/HomePage';

interface IWishListContext {
	items: ItemData[];
	toggleItem: any;
}

const WishListContext = React.createContext<IWishListContext>({
	items: [],
	toggleItem: (item: any) => {}
});

export default WishListContext;
