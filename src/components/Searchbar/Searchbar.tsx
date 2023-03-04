import './Searchbar.scss';
import { SearchIcon } from '../../assets/SearchIcon';

const Searchbar = () => {
	return (
		<div className="searchbar-con">
			<input placeholder="Search" />
			<div className="search-icon">
				<SearchIcon />
			</div>
		</div>
	);
};

export default Searchbar;
