'use client';

import { useState } from 'react';
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
  IconButton,
  Tooltip,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import { useUsers } from '@/hooks/useUsers';
import { useDeleteUser } from '@/hooks/useDeleteUser';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import UserSuccessModal from '@/components/usersTable/UserSuccessModal';
import Button from '@/components/UI/Button';
import { CreateUserFormData } from '@/hooks/useCreateUser';
import { UserInterface } from '@/types/auth.types';

export default function UserTable() {
  const { users, loading, error, fetchUsers } = useUsers();

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState<CreateUserFormData | null>(null);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleUserCreationSuccess = (data: CreateUserFormData) => {
    setAddModalOpen(false);
    setNewUserData(data);
    setSuccessModalOpen(true);
    fetchUsers();
  };

  const {
    isLoading: isDeleting,
    handleDelete,
  } = useDeleteUser({
    onSuccess: () => {
      setDeleteModalOpen(false);
      setSelectedUser(null);
      fetchUsers();
    },
  });

  const handleOpenEditModal = (user: UserInterface) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleOpenDeleteModal = (user: UserInterface) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      handleDelete(selectedUser.userId);
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading && users.length === 0) {
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
              <TableCell sx={{ borderRight: '1px solid rgba(224,224,224,1)' }}>Роль</TableCell>
              <TableCell align="center" sx={{ width: '120px' }}>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleUsers.map((user) => (
              <TableRow key={user.userId}>
                <TableCell sx={{ borderRight: '1px solid rgba(224,224,224,1)' }}>{user.login}</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224,224,224,1)' }}>{user.name}</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224,224,224,1)' }}>{user.surName}</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224,224,224,1)' }}>{user.role}</TableCell>
                <TableCell align="center" sx={{ width: '120px' }}>
                  <Tooltip title="Редактировать">
                    <IconButton onClick={() => handleOpenEditModal(user)}sx={{color: "blue"}}>
                      <EditRoundedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Удалить">
                    <IconButton onClick={() => handleOpenDeleteModal(user)} sx={{color: "red"}}>
                      <DeleteForeverRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
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
        <Button onClick={() => setAddModalOpen(true)} sx={{ width: 'auto' }}>
          Добавить нового пользователя
        </Button>
      </Box>

      <AddUserModal
        open={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSuccess={handleUserCreationSuccess}
      />
      <UserSuccessModal
        open={isSuccessModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        userData={newUserData}
      />
      <EditUserModal
        open={isEditModalOpen}
        onClose={handleCloseModals}
        onSuccess={fetchUsers}
        user={selectedUser}
      />
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        userName={selectedUser?.name}
      />
    </Box>
  );
}