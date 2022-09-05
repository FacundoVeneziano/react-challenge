import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { deleteUser } from "../services/api";
import AlertDialog from "./AlertDialog";
import { useState } from "react";
import { formatError } from "../helpers/errors";

const TableData = ({ users, getUsers, onPressEdit, onShowMessage }) => {
  const [page, setPage] = useState(1);
  const MAX_PER_PAGE = 3;
  const entriesToSkip = MAX_PER_PAGE * page - MAX_PER_PAGE;

  const deleteUsers = (id) => {
    deleteUser(id)
      .then(() => {
        getUsers();
      })
      .catch((error) =>
        onShowMessage({
          message: formatError(error),
          type: "error",
        })
      );
  };

  const handleChangePage = (_, page) => {
    setPage(page);
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
          {users
            .slice(entriesToSkip, entriesToSkip + MAX_PER_PAGE)
            .map((user) => (
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
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Pagination
          siblingCount={1}
          count={Math.ceil(users.length / MAX_PER_PAGE)}
          size="medium"
          onChange={handleChangePage}
        />
      </Grid>
    </TableContainer>
  );
};

export default TableData;
