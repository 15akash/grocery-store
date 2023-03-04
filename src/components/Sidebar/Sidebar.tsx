import './Sidebar.scss';
import { Avatar } from '../../assets/Avatar';
import { CartIcon } from '../../assets/CartIcon';
import { HeartIcon } from '../../assets/HeartIcon';

const Sidebar = () => {
	return (
		<div className="sidebar-con">
			<div className="icon-con">
				<HeartIcon fill="#E86F6F" stroke="#FF5E5E" />
				<div className="badge-con fav-icon">
					<p>8</p>
				</div>
			</div>
			<div className="avatar-con">
				<Avatar />
			</div>
			<div className="icon-con">
				<CartIcon />
				<div className="badge-con cart-icon">
					<p>8</p>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
