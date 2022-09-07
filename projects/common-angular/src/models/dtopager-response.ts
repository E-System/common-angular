import {DTOPager} from './dtopager';

export interface DTOPagerResponse<T> {
  data: T[];
  pager: DTOPager<T>;
}
