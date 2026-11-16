import { useRef } from 'react';
import s from './LikeButton.module.css';
import { ReactComponent as LikeSvg } from '../../../shared/assets/icons/like.svg?react';
import classNames from 'classnames';
import { useAppSelector } from '../../../shared/store/utils';
import { userSelectors } from '../../../entities/user';
import {
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
	IErrorResponse,
} from '../../../entities/product';
import { toast } from 'react-toastify';

type TLikeButtonProps = {
	product: Product;
};
export const LikeButton = ({ product }: TLikeButtonProps) => {
	const isRequestPendingRef = useRef(false);
	const accessToken = useAppSelector(userSelectors.getAccessToken);
	const user = useAppSelector(userSelectors.getUser);

	const [setLike] = useSetLikeProductMutation();
	const [deleteLike] = useDeleteLikeProductMutation();

	const isLike = product?.likes.some((l) => l.userId === user?.id);

	const toggleLike = async () => {
		if (isRequestPendingRef.current) {
			return;
		}

		if (!accessToken) {
			toast.warning('Вы не авторизованы');
			return;
		}
		isRequestPendingRef.current = true;
		try {
			let response;
			if (isLike) {
				response = await deleteLike({ id: `${product.id}` });
			} else {
				response = await setLike({ id: `${product.id}` });
			}

			if (response.error) {
				const error = response.error as IErrorResponse;
				toast.error(error.data.message);
			}
		} finally {
			isRequestPendingRef.current = false;
		}
	};

	return (
		<button
			className={classNames(s['card__favorite'], {
				[s['card__favorite_is-active']]: isLike,
			})}
			onClick={toggleLike}>
			<LikeSvg />
		</button>
	);
};
