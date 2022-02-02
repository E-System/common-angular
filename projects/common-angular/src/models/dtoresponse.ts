import {DTOPager} from './dtopager';

export interface DTOResponse<T> {
  data: T;
  pager: DTOPager;
}
