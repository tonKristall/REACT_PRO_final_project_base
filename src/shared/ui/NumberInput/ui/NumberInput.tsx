import { ChangeEventHandler, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import s from './NumberInput.module.css';

type NumberInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'type' | 'value' | 'defaultValue' | 'onChange'
> & {
	value: number;
	onChange: ChangeEventHandler<HTMLInputElement>;
	onIncrement: () => void;
	onDecrement: () => void;
	incrementDisabled?: boolean;
	decrementDisabled?: boolean;
};

export const NumberInput = ({
	className,
	onIncrement,
	onDecrement,
	incrementDisabled = false,
	decrementDisabled = false,
	...props
}: NumberInputProps) => {
	return (
		<div className={classNames(s.counter, className)}>
			<button
				type='button'
				className={s.button}
				onClick={onDecrement}
				disabled={decrementDisabled}>
				−
			</button>
			<input {...props} type='number' className={s.input} />
			<button
				type='button'
				className={s.button}
				onClick={onIncrement}
				disabled={incrementDisabled}>
				+
			</button>
		</div>
	);
};
