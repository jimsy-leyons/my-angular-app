import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayOfWeek'
})
export class DayOfWeekPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return 'Invalid date';

    // Parse the date string in YYYY-MM-DD format
    const [year, month, day] = value.split('-').map(Number);

    // Create a new Date object with the parsed values
    const date = new Date(year, month - 1, day); // month is 0-indexed

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

}
