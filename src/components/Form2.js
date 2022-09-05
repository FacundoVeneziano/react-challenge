import { TextField, Button } from "@mui/material";
import { formatError } from "../helpers/errors";
import { createUser, editUser } from "../services/api";

import useFormStyles from "../styles/useFormFields";

const Form2 = ({
  setStep = () => {},
  setForm = () => {},
  form,
  getUsers,
  isEditing,
  onResetForm,
  onShowMessage,
}) => {
  const classes = useFormStyles();

  const handleOnSubmit = isEditing ? editUser : createUser;

  const onSubmit = (event) => {
    event.preventDefault();

    handleOnSubmit(form)
      .then(() => {
        onShowMessage({
          message: isEditing ? 'Editado correctamente' : "Creado",
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
      );
  };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
        onChange={onChange}
      />
      <TextField
        className={classes.formField}
        fullWidth
        required
        id="phoneNumber"
        label="Teléfono"
        value={form.phoneNumber}
        name="phoneNumber"
        onChange={onChange}
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
        onChange={onChange}
      />
      <Button
        className={classes.formButtons}
        variant="outlined"
        onClick={() => setStep(0)}
      >
        Anterior
      </Button>
      <Button variant="contained" type="submit" onSubmit={onSubmit}>
        Enviar
      </Button>
    </form>
  );
};

export default Form2;
