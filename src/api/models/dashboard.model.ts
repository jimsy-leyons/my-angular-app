import { Filter } from './common/filter.model';

export class DasboardCountsFilter extends Filter {
  magent_id?: number;
  muser_id?: number;
}

export class DasboardUserStatisticsFilter extends Filter {
  magent_id?: number;
  muser_id?: number;
  fromDate?: string;
  toDate?: string;
}