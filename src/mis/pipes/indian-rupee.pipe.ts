import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'indianRupee'
})
export class IndianRupeePipe implements PipeTransform {

    constructor(private decimalPipe: DecimalPipe) {}

    transform(value: any): string {
        if (isNaN(value)) {
            return value; // Return the value as it is if it is not a number
        }

        // Format the number as Indian Rupee with the symbol
        const formattedValue = value.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR'
        });
        const numericValue = parseFloat(formattedValue.replace(/[^0-9.-]/g, ''));
        const formattedValueWithSymbol = "₹ " + this.decimalPipe.transform(numericValue, '1.2-2');

        return formattedValueWithSymbol;
    }
}
