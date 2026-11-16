import { useCartCount } from '../model/useCartCount';
import { NumberInput } from '../../../shared/ui/NumberInput';

type TCartCounter = {
	productId: string;
};

export const CartCounter = ({ productId }: TCartCounter) => {
	const { count, stock, handleSetCount, handleIncrement, handleDecrement } =
		useCartCount(productId);

	return (
		<NumberInput
			value={count}
			onChange={handleSetCount}
			onIncrement={handleIncrement}
			onDecrement={handleDecrement}
			incrementDisabled={count >= stock}
		/>
	);
};
