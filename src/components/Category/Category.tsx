import './Category.scss';

export interface CategoryProps {
	id: string;
	text: string;
	onCategorySelect: any;
}

const Category = ({ id, text, onCategorySelect }: CategoryProps) => {
	return (
		<div className="category-con" key={id} onClick={() => onCategorySelect(id)}>
			<h5>{text}</h5>
		</div>
	);
};

export default Category;
