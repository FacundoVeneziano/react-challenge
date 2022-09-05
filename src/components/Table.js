import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { deleteUser } from "../services/api";
import CustomPagination from "./Pagination";
import AlertDialog from "./AlertDialog";

const TableData = ({ users, getUsers, onPressEdit }) => {
  const deleteUsers = (id) => {
    deleteUser(id)
      .then((res) => {
        getUsers();
      })
      .catch((error) => {
        console.log(error);
      });
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
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.cc}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => onPressEdit(user)}>
                  <EditIcon />
                </Button>
                <AlertDialog onConfirm={() => deleteUsers(user._id)}>
                  <DeleteIcon />
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid>
        <CustomPagination users={users} />
      </Grid>
    </TableContainer>
  );
};

export default TableData;
