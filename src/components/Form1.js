import { TextField, Button, Stack, Alert } from "@mui/material";

import useFormStyles from "../styles/useFormFields";

const Form1 = ({
  setStep = () => {},
  onChangeForm = () => {},
  form,
  isEditing,
  onResetForm,
  errors,
}) => {
  const classes = useFormStyles();

  const onSubmit = (event) => {
    event.preventDefault();

    setStep(1);
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        className={classes.formField}
        fullWidth
        required
        id="name"
        label="Nombre"
        value={form.name}
        name="name"
        onChange={onChangeForm}
      />
      <TextField
        className={classes.formField}
        fullWidth
        required
        id="name"
        label="Apellido"
        value={form.lastName}
        name="lastName"
        onChange={onChangeForm}
      />
      {isEditing && (
        <Button
          className={classes.formButtons}
          variant="outlined"
          onClick={onResetForm}
        >
          Cancelar Edicion
        </Button>
      )}
      <Button
        variant="contained"
        type="submit"
        disabled={Object.values(errors).length > 0}
      >
        Siguiente
      </Button>
    </form>
  );
};

export default Form1;
