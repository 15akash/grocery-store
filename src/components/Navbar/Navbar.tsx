import './Navbar.scss';
import Searchbar from '../Searchbar/Searchbar';

const Navbar = (props: any) => {
	return (
		<div className="navbar-con">
			<h2 onClick={() => props.goToHomepage(false)}>GROCERIES</h2>
			<Searchbar onChange={(search: string) => props.onChange(search)} />
		</div>
	);
};

export default Navbar;
