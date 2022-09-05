import { useState, cloneElement } from "react";

import {
  Container,
  Step,
  Stepper,
  StepLabel,
  Box,
  Grid,
  Stack,
  Alert,
} from "@mui/material";

import Form1 from "./components/Form1";
import Form2 from "./components/Form2";
import TableData from "./components/Table";
import useUsers from "./hooks/useUsers";
import SimpleSnackbar from "./components/SimpleSnackbar";
import { useFormFields } from "./hooks/useFormFields";

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

const validations = {
  name: {
    regex: RegExp(/^[a-zA-Z ]*$/),
    error: "Nombre solo puede tener letras y espacios",
  },
  lastName: {
    regex: RegExp(/^[a-zA-Z ]*$/),
    error: "Apellido solo puede tener letras y espacios",
  },
  phoneNumber: {
    regex: RegExp(/^\+{0,1}\d*$/),
    error: "Formato no válido, ej: +123456",
  },
};

const initialAlertMessage = {
  isOpen: false,
  type: "",
  message: "",
};

const App = () => {
  const [step, setStep] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [form, handleChangeForm, resetForm, fillForm, errors] = useFormFields(
    initialForm,
    validations
  );
  const [alertMessage, setAlertMessage] = useState(initialAlertMessage);
  const { users, getUsers } = useUsers(setAlertMessage);

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
    fillForm({
      ...user,
    });
  };

  const handleResetForm = () => {
    setIsEditing(false);
    resetForm();
    setStep(0);
  };

  const showErrors = () => {
    return (
      <Stack sx={{ width: "100%" }} spacing={2}>
        {Object.values(errors).map((item) => (
          <Alert key={item} severity="error">
            {item}
          </Alert>
        ))}
      </Stack>
    );
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
              onChangeForm: handleChangeForm,
              getUsers,
              isEditing,
              onResetForm: handleResetForm,
              onShowMessage: handleMessage,
              errors,
            })}
          </Box>
          {showErrors()}
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
