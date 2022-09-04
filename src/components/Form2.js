import { TextField, Button } from "@mui/material";
import { createUser } from "../services/api";

import useFormStyles from "../styles/useFormFields";

const Form2 = ({ setStep = () => {}, setForm = () => {}, form, getUsers }) => {
  const classes = useFormStyles();

  const cleanForm = () => {
    setForm(
      {
        name: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        cc: "",
      },
      setStep(0)
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: form.name,
      lastName: form.lastName,
      email: form.email,
      phoneNumber: form.phoneNumber,
      cc: form.cc,
    };
    createUser(data)
      .then(() => getUsers())
      .then(() => cleanForm());
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
