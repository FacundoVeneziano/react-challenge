import { useState, cloneElement } from "react";

import { Container, Step, Stepper, StepLabel, Box, Grid } from "@mui/material";

import Form1 from "./components/Form1";
import Form2 from "./components/Form2";
import TableData from "./components/Table";
import useUsers from "./hooks/useUsers";

const steps = [
  {
    label: "Paso 1",
    componente: <Form1 />,
  },
  {
    label: "Paso 2",
    componente: <Form2 />,
  },
];

const App = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cc: "",
  });
  const { users, getUsers } = useUsers();

  return (
    <Container
      fixed
      style={{
        padding: "3em",
      }}
    >
      <Grid container spacing={6}>
        <Grid item md={4} sm={12} xs={12}>
          <Stepper activeStep={step}>
            {steps.map((step, key) => (
              <Step key={key}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box
            style={{
              marginTop: "4em",
            }}
          >
            {cloneElement(steps[step].componente, { setStep, form, setForm, getUsers })}
          </Box>
        </Grid>
        <Grid item md={8} sm={12} xs={12}>
          <TableData users={users} getUsers={getUsers} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
