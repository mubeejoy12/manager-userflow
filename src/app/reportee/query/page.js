"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const DataGrid = dynamic(() => import('@mui/x-data-grid').then((mod) => mod.DataGrid), { ssr: false });
import { Box, Typography } from '@mui/material';
import DashboardLayout from '@/app/components/DashboardLayout';
import { useRouter } from 'next/navigation';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'query', headerName: 'Query', flex: 1 },
];

const allQueries = [
  { id: 1, name: 'John Doe', date: '2024-07-26', query: 'How to reset my password?', userId: 1 },
  { id: 2, name: 'Jane Smith', date: '2024-07-25', query: 'Where can I find the report?', userId: 2 },
  { id: 3, name: 'Peter Jones', date: '2024-07-24', query: 'My account is locked.', userId: 1 },
  { id: 4, name: 'John Doe', date: '2024-07-23', query: 'Issue with login.', userId: 1 },
  { id: 5, name: 'Jane Smith', date: '2024-07-22', query: 'Request for new software.', userId: 2 },
];

const QueryPage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const urlId = router.query.id;
      if (urlId) {
        setUserId(parseInt(urlId));
      }
    }
  }, [router.isReady, router.query?.id]);
  const [userQueries, setUserQueries] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (userId) {
      const filteredQueries = allQueries.filter(query => query.userId === userId);
      setUserQueries(filteredQueries);
      if (filteredQueries.length > 0) {
        setUserName(filteredQueries[0].name);
      }
    }
  }, [userId]);

  return (
    <DashboardLayout>
      <Box sx={{ height: 400, width: '100%', p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'left', mb: 3 }}>
          Query Details for {userName || 'User'}
        </Typography>
        {userId && userQueries.length > 0 ? (
          <DataGrid
            rows={userQueries}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        ) : (
          <Typography>No queries found for this user.</Typography>
        )}
      </Box>
    </DashboardLayout>
  );
};

export default QueryPage;
