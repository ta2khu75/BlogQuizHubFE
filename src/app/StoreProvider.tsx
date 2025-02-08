'use client'
import { AuthActions } from '@/redux/slice/authSlide'
import { AppStore, makeStore } from '@/redux/store'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
interface Props {
    readonly children: React.ReactNode
}
export default function StoreProvider({ children }: Props) {
    const storeRef = useRef<AppStore | null>(null);

    if (!storeRef.current) {
        storeRef.current = makeStore();
    }
    useEffect(() => {
        if (typeof window !== "undefined") {
            storeRef.current?.dispatch(AuthActions.init());
        }
    }, []);
    return <Provider store={storeRef.current}>{children}</Provider>
}