'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Box, Pagination } from '@mui/material';

interface Data {
  id: number;
  title: string;
}

const User: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setData(response.data);
    };
    fetchData();
  }, []);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ color: 'darkgray' }}>
        User Panel
      </Typography>
      <List>
        {paginatedData.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.title} sx={{ color: 'darkgray' }} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default User;
