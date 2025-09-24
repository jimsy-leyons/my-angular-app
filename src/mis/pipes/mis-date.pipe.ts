import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'misDate'
})
export class MisDateTimezonePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) { }

  transform(value: any, format: string): any {
    if (!value) return value;

    const localDate = new Date(value + "Z");

    return this.datePipe.transform(localDate, format);
  }
}
