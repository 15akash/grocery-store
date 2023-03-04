import './Navbar.scss';
import Searchbar from '../Searchbar/Searchbar';
import Sidebar from '../Sidebar/Sidebar';

const Navbar = () => {
	return (
		<div className="navbar-con">
			<h2>GROCERIES</h2>
			<Searchbar />
			<div className="sidebar-column">
				<Sidebar />
			</div>
		</div>
	);
};

export default Navbar;
