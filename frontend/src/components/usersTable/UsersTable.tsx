'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  Typography,
  TablePagination,
} from '@mui/material';
import { useUsers } from '@/hooks/useUsers';
import AddUserModal from './AddUserModal';
import UserSuccessModal from '@/components/usersTable/UserSuccessModal';
import Button from '@/components/UI/Button';
import { CreateUserFormData } from '@/hooks/useCreateUser';

export default function UserTable() {
  const { users, loading, error, fetchUsers } = useUsers();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState<CreateUserFormData | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserCreationSuccess = (data: CreateUserFormData) => {
    setModalOpen(false);
    setNewUserData(data);
    setSuccessModalOpen(true);
    fetchUsers();
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    setNewUserData(null);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const visibleUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E9FAFD' }}>
              <TableCell sx={{ borderRight: '1px solid rgba(224,224,224,1)' }}>Логин</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224,224,224,1)' }}>Имя</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224,224,224,1)' }}>Фамилия</TableCell>
              <TableCell>Роль</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleUsers.map((user) => (
              <TableRow key={user.userId}>
                <TableCell sx={{ borderRight: '1px solid rgba(224,224,224,1)' }}>{user.login}</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224,224,224,1)' }}>{user.name}</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224,224,224,1)' }}>{user.surName}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => setModalOpen(true)} sx={{ width: 'auto' }}>
          Добавить нового пользователя
        </Button>
      </Box>

      <AddUserModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleUserCreationSuccess}
      />
      <UserSuccessModal
        open={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        userData={newUserData}
      />
    </Box>
  );
}