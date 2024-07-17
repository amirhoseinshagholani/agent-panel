import { useEffect, useState } from "react";
import { getToken } from "../../../core/getToken";
import { httpService } from "../../../core/http-service";
import { useOutletContext } from 'react-router-dom';

const Profile = () => {

    const { agent } = useOutletContext();

    return (
        <div>
            <div className="text-gray-900 bg-gray-200 rounded rounded-t-3xl">
                <div className="p-4 bg-gradient-to-r from-blue-200 to-blue-700 rounded-t-3xl">
                    <div className="text-xl text-white">پروفایل</div>
                </div>
            </div>
            <div className="bg-gray-200 p-3">
                <form action="#">
                    <div className={`grid grid-cols-1 bg-white shadow-xl p-7 lg:grid-cols-2 gap-5  text-sm ${agent ? 'text-slate-700' : 'text-slate-400'}`}>
                        <div>
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="name">نام:</label>
                                <input className="h-10 bg-gray-200 text-gray-800 focus:outline-none w-full p-2 rounded-lg" readOnly name="name" type="text" placeholder="نام" value={agent ? agent.fld_vtcmagentsf1 : "در حال بارگزاری..."} />
                            </div>
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="nationalCode">کد ملی:</label>
                                <input className="h-10 bg-gray-200 text-gray-800 focus:outline-none w-full p-2 rounded-lg" readOnly name="nationalCode" type="text" placeholder="کد ملی" value={agent ? agent.cf_1662 : "در حال بارگزاری..."} />
                            </div>
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="mobile">شماره موبایل:</label>
                                <input className="h-10 bg-gray-200 text-gray-800 focus:outline-none w-full p-2 rounded-lg input-ltr"  readOnly name="mobile" type="text" placeholder="شماره موبایل" value={agent ? agent.cf_1656 : "در حال بارگزاری..."} />
                            </div>
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="field">فیلد کاری:</label>
                                <input className="h-10 bg-gray-200 text-gray-800 focus:outline-none w-full p-2 rounded-lg" readOnly name="field" type="text" placeholder="فیلد کاری" value={agent ? agent.cf_1660 : "در حال بارگزاری..."} />
                            </div>
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="email">ایمیل:</label>
                                <input className="h-10 bg-gray-200 text-gray-800 focus:outline-none w-full p-2 rounded-lg" readOnly name="email" type="text" placeholder="ایمیل" value={agent ? agent.cf_1658 : "در حال بارگزاری..."} />
                            </div>
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="phone">تلفن:</label>
                                <input className="h-10 bg-gray-200 text-gray-800 focus:outline-none w-full p-2 rounded-lg" name="phone" type="text" readOnly placeholder="تلفن" value={agent ? agent.cf_1654 : "در حال بارگزاری..."} />
                            </div>
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="description">توضیحات:</label>
                                <textarea rows={2} className="bg-gray-200 text-gray-800 focus:outline-none w-full p-2 rounded-lg" readOnly name="description" placeholder="توضیحات" value={agent ? agent.cf_1672 : "در حال بارگزاری..."}/>
                            </div>
                        </div>

                        <div>
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="postalCode">کد پستی:</label>
                                <input className="h-10 bg-gray-200 text-gray-800 focus:outline-none w-full p-2 rounded-lg" name="postalCode" type="text" readOnly placeholder="کد پستی" value={agent ? agent.cf_1670 : "در حال بارگزاری..."} />
                            </div>
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="accountNumber">شماره حساب:</label>
                                <input className="h-10 bg-gray-200 text-gray-800 focus:outline-none w-full p-2 rounded-lg" name="accountNumber" type="text" readOnly placeholder="شماره حساب" value={agent ? agent.cf_1689 : "در حال بارگزاری..."} />
                            </div>
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="iban">شماره شبا:</label>
                                <input className="h-10 bg-gray-200 text-gray-800 focus:outline-none w-full p-2 rounded-lg" name="iban" type="text" readOnly placeholder="شماره شبا" value={agent ? agent.cf_1691 : "در حال بارگزاری..."} />
                            </div>
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="province">استان:</label>
                                <input className="h-10 bg-gray-200 text-gray-800 focus:outline-none w-full p-2 rounded-lg" name="province" type="text" readOnly placeholder="استان" value={agent ? agent.cf_1664 : "در حال بارگزاری..."} />
                            </div>
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="city">شهر:</label>
                                <input className="h-10 bg-gray-200 text-gray-800 focus:outline-none w-full p-2 rounded-lg" name="city" type="text" readOnly placeholder="شهر" value={agent ? agent.cf_1666 : "در حال بارگزاری..."} />
                            </div>
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="address">آدرس:</label>
                                <textarea rows={2} className="bg-gray-200 text-gray-800 focus:outline-none w-full p-2 rounded-lg" name="address" readOnly placeholder="آدرس" value={agent ? agent.cf_1668 : "در حال بارگزاری..."}/>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Profile;