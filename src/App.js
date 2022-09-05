import { useState, cloneElement } from "react";

import { Container, Step, Stepper, StepLabel, Box, Grid } from "@mui/material";

import Form1 from "./components/Form1";
import Form2 from "./components/Form2";
import TableData from "./components/Table";
import useUsers from "./hooks/useUsers";
import SimpleSnackbar from "./components/SimpleSnackbar";

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

export const initialForm = {
  name: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  cc: "",
};

const initialAlertMessage = {
  isOpen: false,
  type: "",
  message: "",
};

const App = () => {
  const [step, setStep] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(initialForm);
  const { users, getUsers } = useUsers();
  const [alertMessage, setAlertMessage] = useState(initialAlertMessage);

  const handleClose = () => {
    setAlertMessage(initialAlertMessage);
  };

  const handleMessage = ({ message, type }) => {
    setAlertMessage({
      isOpen: true,
      message,
      type,
    });
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setForm({
      ...user,
    });
  };

  const handleResetForm = () => {
    setIsEditing(false);
    setForm(initialForm);
    setStep(0);
  };

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
            {cloneElement(steps[step].componente, {
              setStep,
              form,
              setForm,
              getUsers,
              isEditing,
              onResetForm: handleResetForm,
              onShowMessage: handleMessage,
            })}
          </Box>
        </Grid>
        <Grid item md={8} sm={12} xs={12}>
          <TableData
            users={users}
            getUsers={getUsers}
            onPressEdit={handleEdit}
            onShowMessage={handleMessage}
          />
          <SimpleSnackbar
            open={alertMessage.isOpen}
            handleClose={handleClose}
            message={alertMessage.message}
            type={alertMessage.type}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
