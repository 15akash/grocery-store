import React from 'react';

const CartContext = React.createContext({
	items: [],
	totalAmount: 0,
	addItem: (item: any) => {},
	removeItem: (name: string) => {},
	cancelItem: (item: any) => {},
	totalUnits: 0,
	totalDiscount: 0
});

export default CartContext;
