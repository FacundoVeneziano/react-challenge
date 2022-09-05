import { TextField, Button } from "@mui/material";
import { formatError } from "../helpers/errors";
import { createUser, editUser } from "../services/api";

import useFormStyles from "../styles/useFormFields";
import { useLoading } from "../context/LoadingProvider";

const Form2 = ({
  setStep = () => {},
  onChangeForm = () => {},
  form,
  getUsers,
  isEditing,
  onResetForm,
  onShowMessage,
  errors,
}) => {
  const classes = useFormStyles();
  const { showLoading, hideLoading } = useLoading();

  const handleOnSubmit = isEditing ? editUser : createUser;

  const onSubmit = (event) => {
    event.preventDefault();
    showLoading();
    handleOnSubmit(form)
      .then(() => {
        onShowMessage({
          message: isEditing
            ? "Usuario editado correctamente"
            : "Usuario creado",
          type: "success",
        });
        getUsers();
      })
      .then(() => onResetForm())
      .catch((error) =>
        onShowMessage({
          message: formatError(error),
          type: "error",
        })
      )
      .finally(hideLoading);
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        className={classes.formField}
        fullWidth
        required
        type="email"
        id="email"
        label="E-mail"
        value={form.email}
        name="email"
        onChange={onChangeForm}
      />
      <TextField
        className={classes.formField}
        fullWidth
        required
        id="phoneNumber"
        label="Teléfono"
        value={form.phoneNumber}
        name="phoneNumber"
        onChange={onChangeForm}
      />
      <TextField
        className={classes.formField}
        fullWidth
        required
        type="number"
        id="cc"
        label="Documento de identidad"
        value={form.cc}
        name="cc"
        onChange={onChangeForm}
      />
      <Button
        className={classes.formButtons}
        variant="outlined"
        onClick={() => setStep(0)}
      >
        Anterior
      </Button>
      <Button
        variant="contained"
        type="submit"
        onSubmit={onSubmit}
        disabled={Object.values(errors).length > 0}
      >
        Enviar
      </Button>
    </form>
  );
};

export default Form2;
