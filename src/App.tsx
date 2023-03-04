import { useState } from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Checkout from './pages/Checkout';
import HomePage from './pages/HomePage';
import CartProvider from './store/CartProvider';

function App() {
	const [showCheckout, setShowCheckout] = useState<boolean>(false);

	return (
		<CartProvider>
			<div className="App">
				<div className="column-1">
					<Navbar />
					<div className="main-content">{showCheckout ? <Checkout /> : <HomePage />}</div>
				</div>
				<div className="column-2">
					<Sidebar showCart={setShowCheckout} />
				</div>
			</div>
		</CartProvider>
	);
}

export default App;
