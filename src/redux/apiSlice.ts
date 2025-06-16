import { BaseTag } from '@/env/BaseTag';
import { baseQueryWithReauth } from '@/redux/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: Object.values(BaseTag),
    endpoints: () => ({}), // sẽ inject sau từ các slice khác
});
