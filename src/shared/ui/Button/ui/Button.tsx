import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import s from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary';
	size?: 'small' | 'large';
	isWide?: boolean;
};

export const Button = (props: ButtonProps) => {
	const {
		type = 'button',
		variant = 'primary',
		size = 'small',
		isWide = false,
		className,
		children,
		...rest
	} = props;

	return (
		<button
			type={type}
			className={classNames(
				s.button,
				variant === 'primary' && s.button_type_primary,
				variant === 'secondary' && s.button_type_secondary,
				isWide && s.button_type_wide,
				size === 'large' && s.button_size_large,
				className
			)}
			{...rest}>
			{children}
		</button>
	);
};
