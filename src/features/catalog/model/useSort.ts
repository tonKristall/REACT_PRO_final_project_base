import { useAppDispatch, useAppSelector } from '../../../shared/store/utils';
import { catalogActions, catalogSelectors } from './catalogSlice';

interface SortParams {
	title: string;
	value: Sort;
	href: string;
}
export const useSort = () => {
	const dispatch = useAppDispatch();

	const sort = useAppSelector(catalogSelectors.getSort);

	const setSort = (newSort: Sort) => {
		dispatch(catalogActions.setSort(newSort));
	};

	const sortParams: SortParams[] = [
		{
			title: 'Дешевые',
			value: 'low-price',
			href: '#',
		},
		{
			title: 'Дорогие',
			value: 'high-price',
			href: '#',
		},
		{
			title: 'Новые',
			value: 'newest',
			href: '#',
		},
		{
			title: 'Старые',
			value: 'oldest',
			href: '#',
		},
	];
	return { sort, setSort, sortParams };
};
