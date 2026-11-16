import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { userSelectors } from '../../../entities/user';
import { useAppSelector } from '../../../shared/store/utils';
import { isLiked } from '../../../shared/utils';
import { catalogSelectors } from './catalogSlice';
import { useGetProductsQuery } from '../../../entities/product';

const EMPTY_PRODUCTS: Product[] = [];

export const useCatalogProducts = () => {
	const { pathname } = useLocation();

	const { searchText, page, perPage, sort } = useAppSelector(
		catalogSelectors.getCatalogState
	);

	const isFavoritesPage = pathname === '/favorites';
	const { isLoading, isError, error, data, isFetching } = useGetProductsQuery({
		searchText,
		sort,
		page,
		perPage: isFavoritesPage ? undefined : perPage,
	});

	const user = useAppSelector(userSelectors.getUser);
	const userId = user?.id;
	const allProducts = data?.products ?? EMPTY_PRODUCTS;

	const products = useMemo(
		() =>
			isFavoritesPage
				? allProducts.filter((product) => isLiked(product.likes, userId))
				: allProducts,
		[allProducts, isFavoritesPage, userId]
	);

	const productsCount = data?.length || 0;

	return {
		products,
		isLoading,
		isError,
		isFetching,
		error,
		productsCount,
	};
};
