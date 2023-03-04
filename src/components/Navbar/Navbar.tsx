import './Navbar.scss';
import Searchbar from '../Searchbar/Searchbar';

const Navbar = () => {
	return (
		<div className="navbar-con">
			<h2>GROCERIES</h2>
			<Searchbar />
		</div>
	);
};

export default Navbar;
