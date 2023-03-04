import './Searchbar.scss';
import { SearchIcon } from '../../assets/SearchIcon';

const Searchbar = (props: any) => {
	return (
		<div className="searchbar-con">
			<input placeholder="Search" onChange={e => props.onChange(e.target.value)} />
			<div className="search-icon">
				<SearchIcon />
			</div>
		</div>
	);
};

export default Searchbar;
