import { combineReducers } from 'redux';
import { userSlice } from '../../entities/user';
import { cartSlice } from '../../entities/cart';
import { catalogSlice } from '../../features/catalog';
import { authApi } from '../../features/auth/api';
import { productsApi } from '../../entities/product';

export const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[cartSlice.name]: cartSlice.reducer,
	[catalogSlice.name]: catalogSlice.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
});
