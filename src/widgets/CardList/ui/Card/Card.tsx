import { memo } from 'react';
import { LikeButton } from '../../../../features/favorites';
import { CartCounter, useAddToCart } from '../../../../features/cart';
import { cartSelectors } from '../../../../entities/cart';
import { useAppSelector } from '../../../../shared/store/utils';
import { Button } from '../../../../shared/ui/Button';
import classNames from 'classnames';
import s from './Card.module.css';
import { Price } from './Price/Price';
import { Link } from 'react-router-dom';

type CardProps = {
	product: Product;
};

export const Card = memo(function Card({ product }: CardProps) {
	const { discount, price, name, tags, id, images } = product;
	const isProductInCart = useAppSelector((state) =>
		cartSelectors.getCartProducts(state).some((item) => item.id === id)
	);
	const { addProductToCart } = useAddToCart();

	return (
		<article className={s['card']}>
			<div
				className={classNames(
					s['card__sticky'],
					s['card__sticky_type_top-left']
				)}>
				<span className={s['card__discount']}>{discount}</span>
				{tags.length > 0 &&
					tags.map((t) => (
						<span key={t} className={classNames(s['tag'], s['tag_type_new'])}>
							{t}
						</span>
					))}
			</div>
			<div
				className={classNames(
					s['card__sticky'],
					s['card__sticky_type_top-right']
				)}>
				<LikeButton product={product} />
			</div>
			<Link className={s['card__link']} to={`/products/${id}`}>
				<img
					src={images}
					alt={name}
					className={s['card__image']}
					loading='lazy'
				/>
				<div className={s['card__desc']}>
					<Price price={price} discountPrice={discount} />
					<h3 className={s['card__name']}>{name}</h3>
				</div>
			</Link>
			{isProductInCart ? (
				<CartCounter productId={id} />
			) : (
				<Button
					className={s.cartAction}
					onClick={() => addProductToCart({ ...product, count: 1 })}>
					В корзину
				</Button>
			)}
		</article>
	);
});
