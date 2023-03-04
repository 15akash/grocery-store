import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import HomePage from './pages/HomePage';

function App() {
	return (
		<div className="App">
			<div className="column-1">
				<Navbar />
				<div className="main-content">
					<HomePage />
				</div>
			</div>
			<div className="column-2">
				<Sidebar />
			</div>
		</div>
	);
}

export default App;
