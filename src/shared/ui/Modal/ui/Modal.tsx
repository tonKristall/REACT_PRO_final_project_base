import {
	MouseEvent,
	ReactNode,
	SyntheticEvent,
	useId,
	useLayoutEffect,
	useRef,
} from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
};

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const closeButtonRef = useRef<HTMLButtonElement | null>(null);
	const titleId = useId();
	const modalRoot = document.getElementById('modal-root');

	const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
		if (event.target !== event.currentTarget) {
			return;
		}

		const { left, right, top, bottom } =
			event.currentTarget.getBoundingClientRect();

		const isClickBackDrop =
			event.clientX < left ||
			event.clientX > right ||
			event.clientY < top ||
			event.clientY > bottom;

		if (isClickBackDrop) {
			onClose();
		}
	};

	const handleCancel = (event: SyntheticEvent<HTMLDialogElement, Event>) => {
		event.preventDefault();
		onClose();
	};

	useLayoutEffect(() => {
		const dialog = dialogRef.current;

		if (!isOpen || !dialog) {
			return;
		}

		const trigger = document.activeElement;
		dialog.showModal();
		closeButtonRef.current?.focus();

		return () => {
			dialog.close();

			if (trigger instanceof HTMLElement) {
				trigger.focus();
			}
		};
	}, [isOpen]);

	if (!modalRoot) {
		throw new Error('Для Modal необходим контейнер #modal-root');
	}

	return createPortal(
		// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
		<dialog
			ref={dialogRef}
			className={s.modal}
			onCancel={handleCancel}
			onClick={handleBackdropClick}>
			<div className={s.header}>
				<h2 id={titleId} className={s.title}>
					{title}
				</h2>
				<button
					ref={closeButtonRef}
					type='button'
					className={s.close}
					onClick={onClose}>
					<span aria-hidden='true'>×</span>
				</button>
			</div>
			{children}
		</dialog>,
		modalRoot
	);
};
