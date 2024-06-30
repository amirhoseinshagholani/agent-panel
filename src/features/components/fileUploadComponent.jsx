
import React from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const FileUploadComponent = () => {
    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('operation', 'create');
        formData.append('sessionName', 'ba2d98a667fd3915fc1d');
        formData.append('element', JSON.stringify({
            "notes_title": "Document test",
            "filename": file.name,
            "filetype": file.type,
            "filesize": file.size,
            "filelocationtype": "I",
            "filestatus": "1",
            "assigned_user_id": "19x1"
        }));
        formData.append('elementType', 'Documents');

        try {
            const response = await axios.post('https://test.crm24.io/webservice.php', formData, {
                headers: {
                    'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // جایگزین کردن با توکن واقعی
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(JSON.stringify(response.data));
            alert("File uploaded successfully!"); // نمایش پیام آپلود موفقیت‌آمیز
        } catch (error) {
            console.error(error);
            alert("Error uploading file."); // نمایش پیام خطا در صورت اشکال در آپلود
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} style={{ border: '2px dashed #eee', padding: '20px', textAlign: 'center' }}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
    );
};

export default FileUploadComponent;
