import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { AuthReducer } from "./reducers/AuthReducer";
import CategoryReducer from "./reducers/CategoryReducer";
import { IsLoadingReducer } from "./reducers/IsLoadingReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, CategoryReducer);

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  devTools: true,
  reducer: {
    auth: AuthReducer,
    category: persistedReducer,
    loading: IsLoadingReducer,
  },
  middleware: [thunk],
});

const persistor = persistStore(store);

export { persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
