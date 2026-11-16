import { useState } from 'react';
import classNames from 'classnames';
import s from './ReviewList.module.css';
import { Rating } from '../../../shared/ui/Rating';
import { ReviewForm } from '../../../features/reviews';
import { Button } from '../../../shared/ui/Button';
import { Modal } from '../../../shared/ui/Modal';

type ReviewListProps = {
	product: Product;
};
export const ReviewList = ({ product }: ReviewListProps) => {
	const [isReviewOpen, setIsReviewOpen] = useState(false);

	return (
		<div className={classNames(s['product__reviews'])}>
			{product.reviews.map((review) => (
				<div className={s['review']} key={review.id}>
					<div className={s['review__header']}>
						<div className={s['review__name']}>{review.user.name}</div>
						<div className={s['review__date']}>
							{new Date(review.createdAt).toLocaleDateString('ru-RU')}
						</div>
					</div>
					<Rating rating={review.rating} />
					<p className={s['review__text']}>{review.text}</p>
				</div>
			))}

			<Button onClick={() => setIsReviewOpen(true)} size={'large'}>
				Написать отзыв
			</Button>
			<Modal
				isOpen={isReviewOpen}
				onClose={() => setIsReviewOpen(false)}
				title={`Отзыв о товаре ${product.name}`}>
				<ReviewForm productId={product.id} />
			</Modal>
		</div>
	);
};
