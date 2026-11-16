import { configureStore } from '@reduxjs/toolkit';
import AppApi from '../../shared/api/ApiServise';
import { rootReducer } from './rootReducer';
import { authApi } from '../../features/auth/api';
import { productsApi } from '../../entities/product';

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: AppApi,
			},
		}).concat([authApi.middleware, productsApi.middleware]),
});
