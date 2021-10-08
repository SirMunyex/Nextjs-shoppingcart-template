import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, counterReducer);

export default configureStore({
  reducer: {
    counter: persistedReducer,
  },
  middleware: [thunk]
})