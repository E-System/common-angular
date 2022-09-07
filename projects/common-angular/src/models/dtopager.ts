export interface DTOPager<T> {
  page: number;           // Current page
  total: number;          // Total elements count
  pageSize: number;       // Count of elements on page
  values: T[];            // Page elements
  numberOfPages: number;  // Total pages count
  pages: number[];        // Page numbers
}
