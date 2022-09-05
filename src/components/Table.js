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

const TableData = ({ users, getUsers }) => {
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
          {users.map((users) => (
            <TableRow key={users._id}>
              <TableCell>{users.name}</TableCell>
              <TableCell>{users.lastName}</TableCell>
              <TableCell>{users.email}</TableCell>
              <TableCell>{users.phoneNumber}</TableCell>
              <TableCell>{users.cc}</TableCell>
              <TableCell>
                <Button variant="outlined">
                  <EditIcon>Edit</EditIcon>
                </Button>
                <AlertDialog onConfirm={() => deleteUsers(users._id)}>
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
