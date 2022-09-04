import { TextField, Button } from "@mui/material";

import useFormStyles from "../styles/useFormFields";

const Form1 = ({ setStep = () => {}, setForm = () => {}, form }) => {
  const classes = useFormStyles();

  const onSubmit = (event) => {
    event.preventDefault();

    setStep(1);
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
        id="name"
        label="Nombre"
        value={form.name}
        name="name"
        onChange={onChange}
      />
      <TextField
        className={classes.formField}
        fullWidth
        required
        id="name"
        label="Apellido"
        value={form.lastName}
        name="lastName"
        onChange={onChange}
      />
      <Button variant="contained" type="submit" onSubmit={onSubmit}>
        Siguiente
      </Button>
    </form>
  );
};

export default Form1;
