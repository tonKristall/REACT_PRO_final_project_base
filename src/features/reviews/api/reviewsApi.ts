import { productsApi } from '../../../entities/product';

type CreateReviewRequest = Pick<Review, 'text' | 'rating'> & {
	productId: string;
};

const reviewsApi = productsApi.injectEndpoints({
	endpoints: (builder) => ({
		createReview: builder.mutation<Review, CreateReviewRequest>({
			query: ({ productId, text, rating }) => ({
				url: `/reviews/leave/${productId}`,
				method: 'POST',
				body: { text, rating },
			}),
			invalidatesTags: (_result, error, { productId }) =>
				error
					? []
					: [
							{ type: 'Products', id: productId },
							{ type: 'Products', id: 'list' },
					  ],
		}),
	}),
});

export const { useCreateReviewMutation } = reviewsApi;
