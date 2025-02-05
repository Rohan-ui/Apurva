import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const Industry = () => {
    const [fertilizers, setFertilizers] = useState([]);

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

    return (
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
                                <img src={`/uploads/${fertilizer.icon}`} alt={fertilizer.title} width="50" />
                            </TableCell>
                            <TableCell>
                                <img src={`/uploads/${fertilizer.image}`} alt={fertilizer.title} width="50" />
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" color="secondary" onClick={() => handleDelete(fertilizer._id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Industry;