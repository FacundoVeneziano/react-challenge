import { useState } from "react";

export function useFormFields(initialState, validations) {
  const [fields, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChangeFields = (e) => {
    const form = {
      ...fields,
      [e.target.name]: e.target.value,
    };
    setValues(form);
    validate(form);
  };

  const validate = (form) => {
    const err = Object.keys(validations).reduce((acc, item) => {
      if (form[item] && !validations[item].regex.test(form[item])) {
        return {
          ...acc,
          [item]: validations[item].error,
        };
      }

      return acc;
    }, {});

    setErrors(err);
  };

  const fillForm = (values) => setValues(values);

  const resetForm = () => setValues(initialState);

  return [fields, handleChangeFields, resetForm, fillForm, errors];
}
