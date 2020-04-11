import React from "react";
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import { ValidatorComponent } from "react-material-ui-form-validator";

export class ValidatedTimePicker extends ValidatorComponent {
  render() {
    const { errorMessages, validators, requiredError, helperText, validatorListener, ...rest } = this.props;
    const { isValid } = this.state;
    return (
    <KeyboardTimePicker
        {...rest}
        error={!isValid}
        helperText={(!isValid && this.getErrorMessage()) || helperText}
    />
    );
  }
}

export default class ValidatedDatePicker extends ValidatorComponent {
  render() {
    const {  errorMessages, validators, requiredError, helperText, validatorListener, ...rest } = this.props;
    const { isValid } = this.state;
    return (
      <KeyboardDatePicker
        {...rest}
        error={!isValid}
        helperText={(!isValid && this.getErrorMessage()) || helperText}
      />
    );
  }
}
