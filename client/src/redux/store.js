import { configureStore, combineReducers } from '@reduxjs/toolkit';
import hungUserReducer from './user/userSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
const hungRootReducer = combineReducers({
  hunguser: hungUserReducer,
});

const hungPersistConfig = {
  key: 'hungroot',
  storage,
  version: 1,
};
const hungPersistedReducer = persistReducer(hungPersistConfig, hungRootReducer);

export const store = configureStore({
  reducer: hungPersistedReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});

export const hungPersistor = persistStore(store);
