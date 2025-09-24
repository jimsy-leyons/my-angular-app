import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { CheckEmptyPipe } from './check-empty.pipe';
import { IndianRupeePipe } from './indian-rupee.pipe';
import { ResultPagerPipe } from './result-pager.pipe';
import { MisDateTimezonePipe } from './mis-date.pipe';
import { TruncatePipe } from './truncate.pipe';
import { DayOfWeekPipe } from './day-of-week.pipe';

const pipes = [
  CheckEmptyPipe,
  DayOfWeekPipe,
  IndianRupeePipe,
  MisDateTimezonePipe,
  ResultPagerPipe,
  TruncatePipe
]

@NgModule({
//  declarations: [...pipes],
  imports: [
    CommonModule,
    // MisDateTimezonePipe,
    ...pipes
  ],
  exports: [
    ...pipes,
   //  MisDateTimezonePipe
  ],
  providers: [
    DecimalPipe,
    DatePipe
  ]
})
export class CustomPipesModule { }
