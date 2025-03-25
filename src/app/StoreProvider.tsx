'use client'
import useRemoveStorage from '@/hooks/userRemoveStorage';
// import { rootReducer } from '@/redux/rootReducer'
// import { AuthActions } from '@/redux/slice/authSlide'
// import { ExamAnswerActions } from '@/redux/slice/examAnswerSlice'
import { persistor, store } from '@/redux/store'
// import { AppStore, makeStore } from '@/redux/rootReducer'
// import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
interface Props {
    readonly children: React.ReactNode
}
export default function StoreProvider({ children }: Props) {
    useRemoveStorage();
    // const storeRef = useRef<AppStore | null>(null);

    // if (!storeRef.current) {
    //     storeRef.current = rootReducer
    // }
    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         storeRef.current?.dispatch(AuthActions.init());
    //         storeRef.current?.dispatch(ExamAnswerActions.init())
    //     }
    // }, []);
    return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

            {children}
        </PersistGate>
    </Provider>
}