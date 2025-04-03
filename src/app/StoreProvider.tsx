'use client'
import RunChangePatch from '@/components/util/RunChangePatch';
import { persistor, store } from '@/redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
interface Props {
    readonly children: React.ReactNode
}
export default function StoreProvider({ children }: Props) {
    return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <RunChangePatch>
                {children}
            </RunChangePatch>
        </PersistGate>
    </Provider>
}