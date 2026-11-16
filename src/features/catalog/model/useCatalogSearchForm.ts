import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { useAppDispatch } from '../../../shared/store/utils';
import { catalogActions } from './catalogSlice';

const QUERY_SEARCH_PHRASE = 'q';

export const useCatalogSearchForm = () => {
	const dispatch = useAppDispatch();

	const [searchParams, setSearchParams] = useSearchParams();
	const [searchValue, setSearchValue] = useState(
		() => searchParams.get(QUERY_SEARCH_PHRASE) ?? ''
	);

	const optimizedValue = useDebounce(searchValue, 500);

	useEffect(() => {
		dispatch(catalogActions.setSearchText(optimizedValue));
	}, [optimizedValue, dispatch]);

	useEffect(() => {
		if (searchValue) {
			searchParams.set(QUERY_SEARCH_PHRASE, searchValue);
		} else {
			searchParams.delete(QUERY_SEARCH_PHRASE);
		}

		setSearchParams(searchParams);
	}, [searchParams, searchValue, setSearchParams]);

	return {
		searchValue,
		setSearchValue,
	};
};
