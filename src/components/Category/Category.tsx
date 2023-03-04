import './Category.scss';

export interface CategoryProps {
	id: string;
	text: string;
}

const Category = ({ id, text }: CategoryProps) => {
	return (
		<div className="category-con" key={id}>
			<h5>{text}</h5>
		</div>
	);
};

export default Category;
