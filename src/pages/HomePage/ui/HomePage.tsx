import { LoadMore, useCatalogProducts } from '../../../features/catalog';
import { WithProtection } from '../../../features/auth';
import { WithQuery } from '../../../shared/store/HOCs/WithQuery';
import { CardList } from '../../../widgets/CardList';

const CardListWithQuery = WithQuery(CardList);

export const HomePage = WithProtection(() => {
	const { products, isLoading, isError, error } = useCatalogProducts();

	return (
		<>
			<CardListWithQuery
				title='Лакомства'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
			<LoadMore />
		</>
	);
});
