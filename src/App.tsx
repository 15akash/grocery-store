import React from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
// import Sidebar from './components/Sidebar/Sidebar';

function App() {
	return (
		<div className="App">
			<div className="column-1">
				<Navbar />
			</div>
			{/* <div className="column-2"><Sidebar /></div> */}
		</div>
	);
}

export default App;
