import { useCatalogProducts } from '../../../features/catalog';
import { WithProtection } from '../../../features/auth';
import { WithQuery } from '../../../shared/store/HOCs/WithQuery';
import { ButtonBack } from '../../../shared/ui/ButtonBack';
import { CardList } from '../../../widgets/CardList';

const CardListWithQuery = WithQuery(CardList);

export const FavoritesPage = WithProtection(() => {
	const { isLoading, isError, products, error } = useCatalogProducts();

	return (
		<>
			<br />
			<ButtonBack />
			<CardListWithQuery
				title='Избранные'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
		</>
	);
});
