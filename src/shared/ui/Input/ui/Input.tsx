import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import s from './Input.module.css';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ type = 'text', className, ...props }: InputProps) => {
	return (
		<input type={type} className={classNames(s.input, className)} {...props} />
	);
};
