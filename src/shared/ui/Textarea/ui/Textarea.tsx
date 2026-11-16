import { TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';
import s from './Textarea.module.css';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = ({ className, ...props }: TextareaProps) => {
	return <textarea className={classNames(s.textarea, className)} {...props} />;
};
