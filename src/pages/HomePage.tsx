import Category, { CategoryProps } from '../components/Category/Category';
import FoodItem from '../components/FoodItem/FoodItem';
import './Homepage.scss';

export interface ItemData {
	available: number;
	description: string;
	img: string;
	name: string;
	price: string;
	rating: number;
	type: string;
}

const HomePage = ({ storeData }: any) => {
	const categories = [
		{ id: 'all', text: 'All Items' },
		{ id: 'drinks', text: 'Drinks' },
		{ id: 'fruit', text: 'Fruit' },
		{ id: 'bakery', text: 'Bakery' }
	];

	return (
		<div className="homepage-con">
			<div className="category-column">
				{categories.map((category: CategoryProps) => (
					<Category text={category.text} id={category.id} key={category.id} />
				))}
			</div>
			<h1>Trending Items</h1>
			<div className="items-column">
				{storeData.map((t: ItemData, index: number) => (
					<FoodItem key={index} available={t.available} type={t.type} description={t.description} img={t.img} name={t.name} price={t.price} rating={t.rating} />
				))}
			</div>
		</div>
	);
};

export default HomePage;
