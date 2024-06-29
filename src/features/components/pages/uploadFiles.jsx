import { useSubmit } from "react-router-dom";
import useFetchCustomers from "../../hooks/useFetchCustomers";
import { useForm } from "react-hook-form";
import { httpService } from "../../../core/http-service";
import { useState } from "react";
import { MRT_EditRowModal } from "material-react-table";

// cf_1479 "نوع سند"
// filename
// 

const UploadFiles = () => {
    const customers = useFetchCustomers('Contacts', 'cf_1677');
    const { register, handleSubmit } = useForm();
    const submitForm = useSubmit();

    const [fileContent,setFileContent] = useState(null);
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');
    const [fileSize,setFileSize] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);   
            setFileType(file.type);
            setFileSize(file.size);
            const reader = new FileReader();
            reader.onload = (e) => {
                setFileContent(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async(event) => {
        console.log(fileContent);
        if (fileContent && fileType) {
            const byteString = atob(fileContent.split(',')[1]);
            const mimeString = fileContent.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: mimeString });

            const sinaToken = localStorage.getItem('sinaToken');
            const sessionName = localStorage.getItem('sessionName');
            const elemment = {
                "notes_title": event.notes_title,
                "filename": fileName,
                "filetype": fileType,
                "filesize": fileSize,
                "filelocationtype": "I",
                "filestatus": "1",
                "assigned_user_id": "19x1"
            };
            let data = new FormData();
            data.append('file', blob, fileName);
            
            const response_insertContact = await httpService.post('/NetExpert/RegisterCrmTicket', {
                "sessionName": sessionName,
                "file":fileName,
                "operation": `create`,
                "element": JSON.stringify(elemment),
                "elementType": "Documents",
                "CrmRegisterRequestType": 1
            }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": sinaToken
            }
            });
        
            alert("فایل مورد نظر آپلود شد");
            console.log(response_insertContact);
        } else {
            console.log('No file content or type to save');
        }
    }

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
                                    required: 'انتخاب فایل الزامی است'
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
                    </div>
                </form>
            </div>


        </div>
    )
}

export default UploadFiles;

export async function submitUploadFiles(request) {
    // const formData = await request.formData();
    console.log(request);
    const data = Object.fromEntries(request);
    const sinaToken = localStorage.getItem('sinaToken');
    const sessionName = localStorage.getItem('sessionName');
    

    // const currentFile = [{
    //     notes_title: data.notes_title,
    //     filename: data.file.name,
    //     filesize: data.file.size,
    //     filetype: data.file.type,
    //     filelocationtype: "I",
    //     filestatus: 1,
    //     assigned_user_id: data.assigned_user_id,
    //     folderid: data.folderid,
    //     cf_1479: data.cf_1479,  //It's document's type
    // }];
    
    if (currentFile) {
        const response_insertContact = await httpService.post('/NetExpert/RegisterCrmTicket', {
            "sessionName": sessionName,
            "file":data.file,
            "operation": `create`,
            "element": JSON.stringify(currentFile[0]),
            "elementType": "Documents",
            "CrmRegisterRequestType": 1
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": sinaToken
            }
        });

        alert("فایل مورد نظر آپلود شد");
        //     return response_insertContact.status == 200;
        console.log(response_insertContact);
    }


    return false;
}