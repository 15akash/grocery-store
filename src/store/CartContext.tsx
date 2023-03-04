import React from 'react';

interface CartContextInterface {
	items: any;
	totalAmount: number;
	addItem: any;
	removeItem: any;
	cancelItem: any;
	totalUnits: number;
	totalDiscount: number;
}

const CartContext = React.createContext<CartContextInterface>({
	items: [],
	totalAmount: 0,
	addItem: (item: any) => {},
	removeItem: (name: string) => {},
	cancelItem: (item: any) => {},
	totalUnits: 0,
	totalDiscount: 0
});

export default CartContext;
