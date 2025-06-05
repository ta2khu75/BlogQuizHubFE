import { baseQueryWithReauth } from '@/redux/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Accounts', 'Blogs', 'Quizzes'], // Đặt các entity liên quan để cache
    endpoints: () => ({}), // sẽ inject sau từ các slice khác
});
