import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const Industry = () => {
    const [fertilizers, setFertilizers] = useState([]);
    const navigate = useNavigate();

    const fetchFertilizers = async () => {
        try {
            const response = await axios.get('/api/industry/all');
            setFertilizers(response.data);
        } catch (error) {
            console.error('Error fetching fertilizers:', error);
        }
    };

    useEffect(() => {
        fetchFertilizers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/industry/delete/${id}`);
            fetchFertilizers();
        } catch (error) {
            console.error('Error deleting fertilizer:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/industry-form/${id}`);
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<Add />} 
                    component={Link} 
                    to="/industry-form"
                >
                    Add
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Icon</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fertilizers.map((fertilizer) => (
                            <TableRow key={fertilizer._id}>
                                <TableCell>{fertilizer.title}</TableCell>
                                <TableCell>
                                    <img src={`/api/image/download/${fertilizer.icon}`} alt={fertilizer.title} width="50" />
                                </TableCell>
                                <TableCell>
                                    <img src={`/api/image/download/${fertilizer.image}`} alt={fertilizer.title} width="50" />
                                </TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleEdit(fertilizer._id)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton className='bg-red-700' onClick={() => handleDelete(fertilizer._id)}>
                                        <Delete className='text-red-700' />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Industry;
