import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesRepository {
  private errorMessages: { [key: string]: string } = {
    'required': 'This field is required',
    'minlength': 'This field does not meet the minimum length',
    'maxlength': 'This field exceeds the maximum length',
    'pattern': 'Invalid format',
    // add more default error messages here
  };

  getErrorMessage(errorType: string, customMessages?: { [key: string]: string }): string {
    return customMessages && customMessages[errorType] || this.errorMessages[errorType] || 'Invalid field';
  }
}