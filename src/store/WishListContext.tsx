import React from 'react';
import { ItemData } from '../pages/HomePage';

interface WishListContext {
	items: ItemData[];
	toggleItem: any;
}

const WishListContext = React.createContext({
	items: [],
	toggleItem: (item: any) => {}
});

export default WishListContext;
