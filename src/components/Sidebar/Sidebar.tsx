import { useContext } from 'react';
import './Sidebar.scss';
import { Avatar } from '../../assets/Avatar';
import { CartIcon } from '../../assets/CartIcon';
import { HeartIcon } from '../../assets/HeartIcon';
import CartContext from '../../store/CartContext';

const Sidebar = (props: any) => {
	const cartCtx = useContext(CartContext);
	return (
		<div className="sidebar-con">
			<div className="icon-con">
				<HeartIcon fill="#E86F6F" stroke="#FF5E5E" />
				<div className="badge-con fav-icon">
					<p>8</p>
				</div>
			</div>
			<div onClick={() => props.showCart(false)} className="avatar-con">
				<Avatar />
			</div>
			<div onClick={() => props.showCart(true)} className="icon-con">
				<CartIcon />
				<div className="badge-con cart-icon">
					<p>{cartCtx.totalUnits}</p>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
