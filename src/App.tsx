import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Checkout from './pages/Checkout';
import HomePage, { ItemData } from './pages/HomePage';
import CartProvider from './store/CartProvider';
import WishListProvider from './store/WishListProvider';

function App() {
	const [showCheckout, setShowCheckout] = useState<boolean>(false);
	const [storeData, setStoreData] = useState<ItemData[]>([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		axios.get('https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all').then(t => setStoreData([...t.data]));
	}, []);

	const filteredData = useMemo(() => storeData.filter(item => item.name.toLowerCase().includes(search.toLowerCase())), [search, storeData]);

	return (
		<CartProvider>
			<WishListProvider>
				<div className="App">
					<div className="header">
						<Navbar goToHomepage={setShowCheckout} onChange={setSearch} />
						<Sidebar showCart={setShowCheckout} />
					</div>
					<div className="main-content">{showCheckout ? <Checkout /> : <HomePage storeData={filteredData} />}</div>
				</div>
			</WishListProvider>
		</CartProvider>
	);
}

export default App;
