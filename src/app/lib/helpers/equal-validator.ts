import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[Equalvalidate][formControlName],[formControl],[ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => EqualValidator),
            multi: true
        }
    ]
})

export class EqualValidator implements Validator {

    constructor(@Attribute('Equalvalidate') public Equalvalidate: string) { }

    validate(abControl: AbstractControl): { [key: string]: any } {
        // Get self value.
        const val = abControl.value;

        // Get control value.
        const cValue = abControl.root.get(this.Equalvalidate);

        // value not equal
        if (cValue && val !== cValue.value) { return {
            Equalvalidate: false

        };
        }
        return null;
    }
}
