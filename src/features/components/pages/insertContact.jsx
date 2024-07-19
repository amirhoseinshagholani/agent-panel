import { useForm } from "react-hook-form";
import { useActionData, useNavigate, useNavigation, useOutletContext, useSubmit } from "react-router-dom";
import { getToken } from "../../../core/getToken";
import { httpService } from "../../../core/http-service";
import { useEffect, useState } from "react";

const InsertContact = () => {

    const { register, handleSubmit } = useForm();
    const submitForm = useSubmit();

    const onSubmit = (data) => {
        submitForm(data, { method: 'post' })

        setTimeout(() => {
            const inputs = document.querySelectorAll('input[type="text"], textarea');
            inputs.forEach(input => {
                input.value = '';
            });
        }, 2000)
    }

    const { agent } = useOutletContext();

    const navigation = useNavigation();
    const isSubmitting = navigation.state != 'idle';

    return (
        <div>
            <div className="text-gray-900 bg-gray-200 rounded rounded-t-3xl">
                <div className="p-4 bg-gradient-to-r from-blue-200 to-blue-700 rounded-t-3xl">
                    <div className="text-xl text-white">فرم تعریف مشتری</div>
                </div>
            </div>
            {/* <div className="mt-7 mr-3">
                <div className="text-2xl text-slate-600 mb-5">فرم تعریف مشتری</div>
                <div className="text-md  text-slate-500">کاربر گرامی، این فرم جهت تعریف مشتریان در نظر گرفته شده است، پس از تعریف مشتری کارشناسان ما در اسرع وقت با او تماس خواهند گرفت</div>
            </div> */}
            <div className="bg-gray-200 p-3">
                <form onSubmit={handleSubmit(onSubmit)} action="#">
                    <div className="grid grid-cols-1 bg-white shadow-xl p-7 lg:grid-cols-2 gap-5 text-sm text-gray-800">
                        <div className="lg:col-span-1">
                            <div className="mb-3">
                                <label htmlFor="name">نام:</label>
                                <input {...register('name')} className="h-10 bg-gray-200 focus:outline-none w-full p-2 rounded-lg" type="text" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastname">نام خانوادگی:</label>
                                <input {...register('lastname', {
                                    required: 'نام خانوادگی الزامی است'
                                })} className="h-10 bg-gray-200 focus:outline-none w-full p-2 rounded-lg" type="text" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mobile">شماره موبایل:</label>
                                <input {...register('mobile', {
                                    required: 'شماره موبایل الزامی است',
                                    minLength: 11
                                })} className="h-10 bg-gray-200 focus:outline-none w-full p-2 rounded-lg input-ltr" type="text" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mellicode">کد ملی:</label>
                                <input {...register('mellicode', {
                                    minLength: 10
                                })} className="h-10 bg-gray-200 focus:outline-none w-full p-2 rounded-lg" type="text" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="workFeild">حوزه درخواست:</label>
                                <select {...register('workFeild')} className="h-10 text-gray-500 bg-gray-200 focus:outline-none w-full p-2 rounded-lg">
                                    <option value="">انتخاب کنید...</option>
                                    <option value="مودم و خدمات IOT">مودم و خدمات IOT</option>
                                    <option value="پوز و پرداخت الکترونیک">پوز و پرداخت الکترونیک</option>
                                    <option value="تامین شارژ و بسته اینترنتی">تامین شارژ و بسته اینترنتی</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description">توضیحات:</label>
                                <input type="text" {...register('description')} rows={2} className="bg-gray-200 focus:outline-none w-full p-2 rounded-lg" />
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="mb-3">
                                <label htmlFor="phone">تلفن:</label>
                                <input {...register('phone')} className="h-10 bg-gray-200 focus:outline-none w-full p-2 rounded-lg" type="text" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="province">استان:</label>
                                <input {...register('province')} className="h-10 bg-gray-200 focus:outline-none w-full p-2 rounded-lg" type="text" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city">شهر:</label>
                                <input {...register('city')} className="h-10 bg-gray-200 focus:outline-none w-full p-2 rounded-lg" type="text" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address">آدرس:</label>
                                <input type="text" {...register('address')} rows={2} className="bg-gray-200 focus:outline-none w-full p-2 rounded-lg" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city">کد پستی:</label>
                                <input {...register('postalCode')} className="h-10 bg-gray-200 focus:outline-none w-full p-2 rounded-lg" type="text" />
                            </div>
                            <div className="mt-10 text-left">
                                <button className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out pt-3 pb-3 pr-5 pl-5 text-white font-bold rounded-lg" type="submit">
                                    {isSubmitting ? 'در حال ثبت...' : 'ثبت مشتری'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>


        </div>
    )
}

export default InsertContact;


export async function submitInsertContact({ request }) {

    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    // const getBaseData = await getToken();
    // const sinaToken = localStorage.getItem('sinaToken');
    // const sessionName = localStorage.getItem('sessionName');
    // console.log(sessionName);

    const currentContact = `{
        "firstname":"${data.name}",
        "lastname":"${data.lastname}",
        "phone":"${data.phone}",
        "mobile":"${data.mobile}",
        "assigned_user_id":"${localStorage.getItem('agent_id')}",
        "cf_1677":"${localStorage.getItem('agent_id')}",
        "cf_1123":"${data.mellicode}",
        "description":"${data.description}",
        "mailingstate":"${data.province}",
        "mailingcity":"${data.city}",
        "mailingstreet":"${data.address}",
        "mailingzip":"${data.postalCode}",
        "leadsource":"معرفی از طرف نماینده"
    }`;

    if (currentContact) {
        const sessionName = await localStorage.getItem('sessionName');
        const response_insertContact = await httpService.post('/crm/postData', {
            "sessionName":sessionName,
            "element": currentContact,
            "elementType": "Contacts",
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        console.log(response_insertContact);
        alert("مشتری مورد نظر ثبت شد");
        return response_insertContact.status == 200;
    }

    return false;
}



