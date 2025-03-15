import { rootReducer } from "@/redux/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
const persistConfig = {
    key: "root",
    storage,

};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    devTools: true,
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// export type AppStore
export const persistor = persistStore(store);