import { FormGroup } from "@angular/forms";

export const clearValidators = (dataForm: FormGroup, fields: string[]): void => {
    if (dataForm != null) {
        fields.map((field) => {
            dataForm.get(field)?.clearValidators();
            dataForm.get(field)?.updateValueAndValidity();
        })
    }
}