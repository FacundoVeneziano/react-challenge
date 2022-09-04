import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { deleteUser } from "../services/api";

const TableData = ({ users, getUsers }) => {


  const deleteUsers = (id) => {
    const proceed = window.confirm(
      "Estas seguro que deseas eliminar este usuario?"
    );
    if (proceed) {
      deleteUser(id)
        .then(() => {
          getUsers();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Nombre</strong>
            </TableCell>
            <TableCell>
              <strong>Apellido</strong>
            </TableCell>
            <TableCell>
              <strong>E-mail</strong>
            </TableCell>
            <TableCell>
              <strong>Teléfono</strong>
            </TableCell>
            <TableCell>
              <strong>C.C.</strong>
            </TableCell>
            <TableCell>
              <strong>Acciones</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((users) => (
            <TableRow key={users._id}>
              <TableCell>{users.name}</TableCell>
              <TableCell>{users.lastName}</TableCell>
              <TableCell>{users.email}</TableCell>
              <TableCell>{users.phoneNumber}</TableCell>
              <TableCell>{users.cc}</TableCell>
              <TableCell>
                <Button>Edit</Button>
                <Button onClick={() => deleteUsers(users._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableData;
