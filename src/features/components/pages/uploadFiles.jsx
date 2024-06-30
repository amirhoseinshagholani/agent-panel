import { useSubmit } from "react-router-dom";
import useFetchCustomers from "../../hooks/useFetchCustomers";
import { useForm } from "react-hook-form";
import { httpService } from "../../../core/http-service";
import { useState } from "react";
import { MRT_EditRowModal } from "material-react-table";
import { useDropzone } from 'react-dropzone';

// cf_1479 "نوع سند"
// filename
// 

const UploadFiles = () => {
    const customers = useFetchCustomers('Contacts', 'cf_1677');
    const { register, handleSubmit } = useForm();
    const submitForm = useSubmit();


    // const [fileName, setFileName] = useState('');

    const [filePath, setFilePath] = useState(null);
    const handleFileChange = (event) => {
        // setFile(event.target.files[0]);
    };

    const onDrop = async (acceptedFiles) => {
        // const sinaToken = localStorage.getItem('sinaToken');
        // const sessionName = localStorage.getItem('sessionName');
        const file = acceptedFiles[0];
        console.log(file);
        setFilePath(file)

        // const formData = new FormData();
        // formData.append('file', file);
        // formData.append('operation', 'create');
        // formData.append('sessionName', sessionName);
        // formData.append('element', JSON.stringify({
        //     "notes_title": "Document test",
        //     "filename": file.name,
        //     "filetype": file.type,
        //     "filesize": file.size,
        //     "filelocationtype": "I",
        //     "filestatus": "1",
        //     "assigned_user_id": "19x1"
        // }));
        // formData.append('elementType', 'Documents');

        // try {
        //     const response = await axios.post('https://test.crm24.io/webservice.php', formData, {
        //         headers: {
        //             'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // جایگزین کردن با توکن واقعی
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     });

        //     console.log(JSON.stringify(response.data));
        //     alert("File uploaded successfully!"); // نمایش پیام آپلود موفقیت‌آمیز
        // } catch (error) {
        //     console.error(error);
        //     alert("Error uploading file."); // نمایش پیام خطا در صورت اشکال در آپلود
        // }
    };

    const onSubmit = async (event) => {
        const sinaToken = localStorage.getItem('sinaToken');
        const sessionName = localStorage.getItem('sessionName');
        const formData = new FormData();
        formData.append('file', filePath.name);
        formData.append('operation', 'create');
        formData.append('sessionName', sessionName);
        formData.append('element', JSON.stringify({
            "notes_title": event.notes_title,
            "filename": filePath.name,
            "filetype": filePath.type,
            "filesize": filePath.size,
            "filelocationtype": "I",
            "filestatus": "1",
            "assigned_user_id": "19x1"
        }));
        formData.append('elementType', 'Documents');
        try {
            const response = await httpService.post('/NetExpert/RegisterCrmTicket', formData, {
                headers: {
                    'Authorization': sinaToken, // جایگزین کردن با توکن واقعی
                }
            });

            console.log(JSON.stringify(response.data));
            alert("File uploaded successfully!"); // نمایش پیام آپلود موفقیت‌آمیز
        } catch (error) {
            console.error(error);
            alert("Error uploading file."); // نمایش پیام خطا در صورت اشکال در آپلود
        }
        // console.log(event.filename[0].size);
        // formData.append('file', file);
        // const element = {
        //     "notes_title": event.notes_title,
        //     "filename": event.filename[0].name,
        //     "filetype": event.filename[0].type,
        //     "filesize": event.filename[0].size,
        //     "filelocationtype": "I",
        //     "filestatus": "1",
        //     "assigned_user_id": "19x1"
        // };
        // formData.append('operation', 'create');
        // formData.append('sessionName', sessionName);
        // formData.append('element', JSON.stringify(element));
        // formData.append('elementType', 'Documents');

        // try {
        //     const response = await httpService.post('/NetExpert/RegisterCrmTicket', formData, {
        //         headers: {
        //             'Authorization': sinaToken, // جایگزین کردن با توکن واقعی
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     });

        //     console.log(JSON.stringify(response.data));
        //     alert("File uploaded successfully!"); // نمایش پیام آپلود موفقیت‌آمیز
        // } catch (error) {
        //     console.error(error);
        //     alert("Error uploading file."); // نمایش پیام خطا در صورت اشکال در آپلود
        // }
        // formData.append('operation', 'create');
        // formData.append('sessionName', sessionName);
        // formData.append('element', JSON.stringify({
        //     "notes_title": "Document test",
        //     "filename": file.name,
        //     "filetype": file.type,
        //     "filesize": file.size,
        //     "filelocationtype": "I",
        //     "filestatus": "1",
        //     "assigned_user_id": "19x1"
        // }));
        // formData.append('elementType', 'Documents');
        // try {
        //     const response = await httpService.post('/NetExpert/RegisterCrmTicket', formData, {
        //         headers: {
        //             'Authorization': sinaToken,
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     });

        //     console.log(JSON.stringify(response.data));
        //     alert("File uploaded successfully!"); // نمایش پیام آپلود موفقیت‌آمیز
        // } catch (error) {
        //     console.error(error);
        //     alert("Error uploading file."); // نمایش پیام خطا در صورت اشکال در آپلود
        // }
        // var dataTemp = new FormData();
        // var dataForInsert;
        // dataTemp.append('notes_title', event.notes_title);
        // dataTemp.append('assigned_user_id', "19X1");
        // dataTemp.append('folderid', "22x1");
        // dataTemp.append('cf_1479', event.filetype);
        // dataTemp.append('file', event.filename[0]);
        // // var fileSlat = fs.statSync(event.filename[0]);
        // // dataForInsert = Object.fromEntries(dataTemp);
        // submitUploadFiles(dataForInsert);
    }
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    return (
        <div>
            <div className="text-gray-900 bg-gray-200 rounded rounded-t-3xl">
                <div className="p-4 bg-gradient-to-r from-blue-200 to-blue-700 rounded-t-3xl">
                    <div className="text-xl text-white">فرم آپلود فایل</div>
                </div>
            </div>
            <div className="bg-gray-200 p-3">
                <form onSubmit={handleSubmit(onSubmit)} action="#" enctype="multipart/form-data">
                    <div className="grid grid-cols-1 bg-white shadow-xl p-7 lg:grid-cols-2 gap-5 text-sm text-gray-800">

                        <div className="lg:col-span-1">
                            <div className="mb-3">
                                <label htmlFor="name" className="block mb-1">موضوع:</label>
                                <input {...register('notes_title', {
                                    required: "موضوع الزامی است"
                                })} className="h-10 bg-gray-200 focus:outline-none w-full p-2 rounded-lg" type="text" />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="block mb-1">مشتری:</label>
                                <select {...register('contact_id', {
                                    required: 'مشتری الزامی است'
                                })} id="selectedCustomer" className="h-10 text-gray-500 bg-slate-200 focus:outline-none w-full p-2 rounded rounded-lg" required>
                                    <option value="">انتخاب کنید...</option>
                                    {
                                        customers && customers.reverse().map(res => (
                                            <option key={res.id} value={res.id}>{res.firstname} {res.lastname}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="mb-3">
                                <label htmlFor="name">فایل:</label>
                                <input  {...register('filename', {
                                   
                                })} className="h-10 bg-gray-200 focus:outline-none w-full p-2 rounded-lg" type="file" onChange={handleFileChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="workFeild">نوع سند:</label>
                                <select {...register('filetype', {
                                    required: 'نوع سند اجباری است'
                                })} className="h-10 text-gray-500 bg-gray-200 focus:outline-none w-full p-2 rounded-lg">
                                    <option value="">انتخاب کنید...</option>
                                    <option value="کارت ملی">کارت ملی</option>
                                    <option value="شناسنامه">شناسنامه</option>
                                    <option value="فیش واریزی">فیش واریزی</option>
                                </select>
                            </div>
                            <div className="mt-10 text-left">
                                <button className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out pt-3 pb-3 pr-5 pl-5 text-white font-bold rounded-lg" type="submit">
                                    آپلود
                                </button>
                            </div>
                        </div>
                        <div {...getRootProps()} style={{ border: '2px dashed #eee', padding: '20px', textAlign: 'center' }}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </div>
                </form>
            </div>


        </div>
    )
}

export default UploadFiles;



export async function submitUploadFiles(request) {
    const sinaToken = localStorage.getItem('sinaToken');
    const sessionName = localStorage.getItem('sessionName');

    const fileData = request.file;
    // console.log(fileData);

    const currentFile = [{
        notes_title: request.notes_title,
        filename: request.file.name,
        filesize: request.file.size,
        filetype: request.file.type,
        filelocationtype: "I",
        filestatus: 1,
        assigned_user_id: request.assigned_user_id,
        folderid: request.folderid,
        cf_1479: request.cf_1479,  //It's document's type
    }];

    console.log(file);
    const formData = new FormData();
    formData.append('file', file);

    // افزودن فیلدهای اضافی به FormData
    formData.append('notes_title', "ccc");
    formData.append('assigned_user_id', "19X1");
    formData.append('folderid', "22x1");
    formData.append('cf_1479', "شناسنامه");
    formData.append('sessionName', sessionName);
    formData.append('operation', 'create');
    formData.append('elementType', 'Documents');
    formData.append('CrmRegisterRequestType', 1);

    if (currentFile) {
        const response_insertContact = await httpService.post('/NetExpert/RegisterCrmTicket', {
            "sessionName": sessionName,
            "file": file,
            "operation": `create`,
            "element": JSON.stringify(currentFile[0]),
            "elementType": "Documents",
            "CrmRegisterRequestType": 1
        }, {
            headers: {
                "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
                "Authorization": sinaToken
            }
        });

        alert("فایل مورد نظر آپلود شد");
        //     return response_insertContact.status == 200;
        console.log(response_insertContact);
    }

    return false;
}