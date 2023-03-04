import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Checkout from './pages/Checkout';
import HomePage, { ItemData } from './pages/HomePage';
import CartProvider from './store/CartProvider';

function App() {
	const [showCheckout, setShowCheckout] = useState<boolean>(false);
	const [storeData, setStoreData] = useState<ItemData[]>([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		axios.get('https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all').then(t => setStoreData([...t.data]));
	}, []);

	const filteredData = storeData.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

	return (
		<CartProvider>
			<div className="App">
				<div className="column-1">
					<Navbar goToHomepage={setShowCheckout} onChange={setSearch} />
					<div className="main-content">{showCheckout ? <Checkout /> : <HomePage storeData={filteredData} />}</div>
				</div>
				<div className="column-2">
					<Sidebar showCart={setShowCheckout} />
				</div>
			</div>
		</CartProvider>
	);
}

export default App;
