export interface PageResponse<T> {
    total_pages: number;
    total_elements: number;
    page: number;
    content: T[];
}