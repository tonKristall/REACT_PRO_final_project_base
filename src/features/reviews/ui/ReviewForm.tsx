import { startTransition, useActionState, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import s from './ReviewForm.module.css';
import { Rating } from '../../../shared/ui/Rating';
import { Button } from '../../../shared/ui/Button';
import { Textarea } from '../../../shared/ui/Textarea';
import { getMessageFromError } from '../../../shared/utils';
import { objectHasProperty } from '../../../shared/utils/common';
import { useCreateReviewMutation } from '../api/reviewsApi';
import { ErrorMessageField } from '../../../shared/ui/ErrorMessageField/ErrorMessageField';

type ReviewFormState = {
	values: { text: string };
	errors?: { text?: string; rating?: string; root?: string };
	success?: string;
};

const FORM_ACTIONS = { SUBMIT: 'SUBMIT', CLEAR_ERROR: 'CLEAR_ERROR' } as const;
const initialState: ReviewFormState = { values: { text: '' } };

export const ReviewForm = ({ productId }: { productId: string }) => {
	const formRef = useRef<HTMLFormElement>(null);
	const [rating, setRating] = useState(0);
	const [createReview, { isLoading }] = useCreateReviewMutation();

	const submitReview = async (
		_previousState: ReviewFormState,
		formData: FormData
	): Promise<ReviewFormState> => {
		const values = { text: String(formData.get('text') ?? '') };
		if (formData.get('type') !== FORM_ACTIONS.SUBMIT) {
			return { values };
		}

		const selectedRating = Number(formData.get('rating'));
		const isEmptyText = !values.text.trim();
		const isInvalidRating =
			!Number.isInteger(selectedRating) ||
			selectedRating < 1 ||
			selectedRating > 5;
		if (isEmptyText || isInvalidRating) {
			return {
				values,
				errors: {
					text: isEmptyText ? 'Напишите текст отзыва' : undefined,
					rating: isInvalidRating ? 'Выберите оценку от 1 до 5' : undefined,
				},
			};
		}

		try {
			await createReview({
				productId,
				text: values.text.trim(),
				rating: selectedRating,
			}).unwrap();
			setRating(0);
			toast.success('Отзыв отправлен');
			return { values: initialState.values, success: 'Отзыв отправлен' };
		} catch (error) {
			const message = getMessageFromError(
				objectHasProperty(error, 'data') ? error.data : error,
				'Не удалось отправить отзыв. Попробуйте ещё раз'
			);
			toast.error(message);
			return {
				values,
				errors: { root: message },
			};
		}
	};

	const [state, formAction, isPending] = useActionState(
		submitReview,
		initialState
	);

	const clearError = () => {
		if (!formRef.current || (!state.errors && !state.success) || isPending) {
			return;
		}
		const formData = new FormData(formRef.current);
		formData.set('type', FORM_ACTIONS.CLEAR_ERROR);
		startTransition(() => formAction(formData));
	};

	return (
		<form ref={formRef} className={s['form']} action={formAction} noValidate>
			<div className={s.rating}>
				<Rating
					isEdit={!isLoading}
					rating={rating}
					onChange={
						isLoading
							? undefined
							: (index) => {
									setRating(index + 1);
									clearError();
							  }
					}
				/>
				{state.errors?.rating && (
					<ErrorMessageField message={state.errors.rating} />
				)}
			</div>

			<input type='hidden' name='rating' value={rating} />

			<Textarea
				name='text'
				id='text'
				placeholder='Напишите текст отзыва'
				defaultValue={state.values.text}
				onChange={clearError}
				disabled={isLoading}
			/>
			{state.errors?.text && <ErrorMessageField message={state.errors.text} />}
			<Button
				type='submit'
				name='type'
				value={FORM_ACTIONS.SUBMIT}
				disabled={isPending}
				isWide
				size='large'>
				{isLoading ? 'Отправка…' : 'Отправить отзыв'}
			</Button>
		</form>
	);
};
