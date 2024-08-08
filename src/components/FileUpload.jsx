import React, { useState } from 'react';
import axios from 'axios';
import { useAlert } from '../AlertContext';

const FileUpload = ({ setSelectedComponent }) => {
    const { showAlert } = useAlert();
    const [file, setFile] = useState(null);
    const [productId, setProductId] = useState('');
    const [productType, setProductType] = useState('plant');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleIdChange = (e) => {
        setProductId(e.target.value);
    };

    const handleTypeChange = (e) => {
        setProductType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('productId', productId);
        formData.append('productType', productType);
        console.log(formData);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:9090/api/admin/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });
            console.log(response.data);
            showAlert("Image Uploaded !!!");
            setSelectedComponent('UserList');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={productType} onChange={handleTypeChange}>
                <option value="plant">Plant</option>
                <option value="planter">Planter</option>
                <option value="seed">Seed</option>
            </select>
            <input type="text" placeholder="Product ID" value={productId} onChange={handleIdChange} required />
            <input type="file" onChange={handleFileChange} required />
            <button type="submit">Upload</button>
        </form>
    );
};

export default FileUpload;
