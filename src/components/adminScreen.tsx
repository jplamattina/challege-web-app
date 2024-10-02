'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Pagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Idata {
    id: number;
    data: string;
    title: string;
    item: string;
}
interface item {
    id: number;
    item: string;
    title: string;
}

const Admin: React.FC = () => {
  const [data, setData] = useState<Idata[]>([]);
  const [newItem, setNewItem] = useState<string>('');
  const [editingItem, setEditingItem] = useState<{ id: number; title: string } | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setData(response.data);
    };
    fetchData();
  }, []);

  const handleCreate = async () => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: newItem,
      body: 'Sample body',
      userId: 1,
    });
    setData([response.data, ...data]);
    setNewItem('');
  };

  const handleEdit = (item: item) => {
    setEditingItem(item);
    setNewItem(item.title);
  };

  const handleUpdate = async () => {
    if (editingItem) {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${editingItem.id}`, {
        title: newItem,
      });
      const updatedData = data.map(item => (item.id === editingItem.id ? response.data : item));
      setData(updatedData);
      setEditingItem(null);
      setNewItem('');
    }
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    setData(data.filter(item => item.id !== id));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const paginatedItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      <TextField
        label="Enter item title"
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={editingItem ? handleUpdate : handleCreate}>
        {editingItem ? 'Update Item' : 'Create Item'}
      </Button>
      <List>
        {paginatedItems.map((item, index) => (
          <ListItem key={`${item.id}-${index}`} secondaryAction>
            <ListItemText primary={item.title} sx={{ color: 'black' }} />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton edge="end" onClick={() => handleEdit(item)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDelete(item.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
      <Pagination
        count={Math.ceil(data.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ mt: 2 }}
      />
    </Container>
  );
};

export default Admin;
