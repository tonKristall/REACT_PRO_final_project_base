import classNames from 'classnames';
import { useProductCount } from '../model/useProductCount';
import { useAddToCart } from '../model/useAddToCart';
import { Button } from '../../../shared/ui/Button';
import { NumberInput } from '../../../shared/ui/NumberInput';
import s from './ProductCartCounter.module.css';

type ProductCartCounterProps = {
	product: Product;
};

export const ProductCartCounter = ({ product }: ProductCartCounterProps) => {
	const { count, handleCount, handleCountMinus, handleCountPlus } =
		useProductCount();
	const { addProductToCart } = useAddToCart();

	return (
		<div className={classNames(s['product__btn-wrap'])}>
			<NumberInput
				value={count}
				onChange={handleCount}
				onIncrement={handleCountPlus}
				onDecrement={handleCountMinus}
			/>
			<Button onClick={() => addProductToCart({ ...product, count })}>
				В корзину
			</Button>
		</div>
	);
};
