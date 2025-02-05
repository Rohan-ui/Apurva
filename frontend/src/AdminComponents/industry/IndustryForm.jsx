import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const CreateIndustry = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState(null);
    const [image, setImage] = useState(null);
    const [iconPreview, setIconPreview] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (id) {
            // Fetch existing data
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/api/industry/${id}`);
                    const { title, icon, image } = response.data;
                    setTitle(title);
                    setIcon(icon);
                    setImage(image);
                    setIconPreview(`/uploads/${icon}`);
                    setImagePreview(`/uploads/${image}`);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [id]);

    const handleIconChange = (e) => {
        const file = e.target.files[0];
        setIcon(file);
        setIconPreview(URL.createObjectURL(file));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        if (icon instanceof File) {
            formData.append('icon', icon);
        }
        if (image instanceof File) {
            formData.append('image', image);
        }

        try {
            if (id) {
                // Update existing data
                await axios.put(`/api/industry/update/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                // Add new data
                await axios.post('/api/industry/add', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            navigate('/industry'); // Redirect to the list page after submission
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {id ? 'Update Chemical Fertilizer' : 'Add Chemical Fertilizer'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <Button variant="contained" component="label">
                    Upload Icon
                    <input type="file" hidden onChange={handleIconChange} />
                </Button>
                {iconPreview && <img src={iconPreview} alt="Icon Preview" style={{ width: '100px', height: '100px' }} />}
                <Button variant="contained" component="label">
                    Upload Image
                    <input type="file" hidden onChange={handleImageChange} />
                </Button>
                {imagePreview && <img src={imagePreview} alt="Image Preview" style={{ width: '100px', height: '100px' }} />}
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Box>
        </Container>
    );
};

export default CreateIndustry;