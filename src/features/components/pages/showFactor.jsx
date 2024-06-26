import { useEffect, useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { getToken } from "@core/getToken";
import { seprateNumber } from "@core/seprateNumber";
import { httpService } from "@core/http-service";
import useFetchData from "../../hooks/useFetchSalesOrder";
import useFetchFactor from "../../hooks/useFetchFactor";
import { to_jalali } from "../../../core/gregoriToJalali";
import Grid from "../../../core/grid";
import SvgShowDetails from "../svg/svgShowDetails";

const ShowFactor = () => {
    const factor = useFetchFactor('Invoice', 'cf_1681');
    const data = factor && factor.reverse().map(res => (
        {
            subject: res.subject,
            customer: res.cf_1708,
            createdtime: to_jalali(res.createdtime),
            hdnGrandTotal: seprateNumber(parseInt(res.hdnGrandTotal)),
            tax: seprateNumber(parseInt(res.pre_tax_total * 0.1)),  //seprateNumber(parseInt(res.pre_tax_total * (res.tax1 || 10 /100)))
            linkDetails: '/panel/showFactor/details/jkdojdl7d98547q!@gh%'+res.id+'*p)8d$#ss@14203ddef',
            received:seprateNumber(parseInt(res.received)),
            balance:seprateNumber(parseInt(res.balance)),
        }
    ))

    console.log(factor);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'subject',
                header: 'موضوع',
                size: 250,
            },
            {
                accessorKey: 'customer',
                header: 'مشتری',
                size: 150,
            },
            {
                accessorKey: 'createdtime',
                header: 'تاریخ ثبت',
                size: 150,
            },
            {
                accessorKey: 'hdnGrandTotal',
                header: 'جمع کل',
                size: 150,
            },
            {
                accessorKey: 'received',
                header: 'دریافتی',
                size: 150,
            },
            {
                accessorKey: 'balance',
                header: 'مانده',
                size: 100,
            },
            {
                accessorKey: 'tax',
                header: 'مالیات',
                size: 100,
            },
            {
                accessorKey: 'linkDetails',
                header: "",
                size: 20,
                Cell({ cell }) {
                    return (
                        <Link to={`${cell.getValue()}`}>
                            <SvgShowDetails/>
                        </Link>
                    )
                },
            }
        ],
        [],
    );

    // useEffect(() => {
    //     console.log(factor);
    // }, [factor])
    return (
        <div className="text-gray-900 bg-gray-200 rounded rounded-t-3xl">
            <div>
                <div className="p-4 bg-gradient-to-r from-blue-200 to-blue-700 rounded-t-3xl">
                    <div className="text-xl text-white">فاکتورهای ثبت شده</div>
                </div>
                <div className="px-3 py-4">
                    {
                        <Grid columns={columns} data={data} />
                    }
                </div>
            </div>
        </div>
        // <div className="text-gray-900 bg-gray-200">
        //     <div className="p-4 flex ">
        //         <h1 className="text-2xl">فاکتورهای ثبت شده</h1>
        //     </div>
        //     <div className="px-3 py-4 flex">
        //         <table className="w-full text-md bg-white shadow-md rounded mb-4 overflow-y-auto text-sm">
        //             <tbody>
        //                 <tr className="border-b bg-blue-300">
        //                     <th className="text-right p-3 px-5">موضوع</th>
        //                     <th className="text-right p-3 px-5">مشتری</th>
        //                     <th className="text-right p-3 px-5">تاریخ ثبت</th>
        //                     <th className="text-right p-3 px-5">جمع کل</th>
        //                     <th className="text-right p-3 px-5">مالیات</th>
        //                     <th className="text-right p-3 px-5"></th>
        //                 </tr>
        //                 {
        //                     // factor && (
        //                     //     console.log(factor)        
        //                     // )
        //                     factor && (
        //                         factor.reverse().map((res) => (
        //                             <tr className="border-b hover:bg-orange-100 bg-gray-100">
        //                                 <td className="p-3 px-5">
        //                                     <input type="text" value={res.subject} className="bg-transparent outline-none border-gray-300 py-2" />
        //                                 </td>
        //                                 <td className="p-3 px-5">
        //                                     <input type="text" value={res.cf_1708} className="bg-transparent outline-none border-gray-300 py-2" />
        //                                 </td>
        //                                 <td className="p-3 px-5">
        //                                     <input type="text" value={to_jalali(res.createdtime)} className="bg-transparent outline-none border-gray-300 py-2" />
        //                                 </td>
        //                                 <td className="p-3 px-5">
        //                                     <input type="text" value={seprateNumber(parseInt(res.hdnGrandTotal))} className="bg-transparent outline-none border-gray-300 py-2" />
        //                                 </td>
        //                                 <td className="p-3 px-5">
        //                                     <input type="text" value={seprateNumber(parseInt(res.pre_tax_total * (res.tax1 || 0 /100)))} className="bg-transparent outline-none border-gray-300 py-2" />
        //                                 </td>
        //                                 <td className="p-3 px-5">
        //                                     <Link to={`/panel/showFactor/details/jkdojdl7d98547q!@gh%${res.id}*p)8d$#ss@14203ddef`}>
        //                                         <svg xmlns="http://www.w3.org/2000/svg" height="16" fill="currentColor" viewBox="0 0 16 16">
        //                                             <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2zm5 10v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2v5a2 2 0 0 1-2 2z" />
        //                                         </svg>
        //                                     </Link>
        //                                 </td>
        //                             </tr>
        //                             )
        //                         )
        //                     )
        //                 }
        //             </tbody>
        //         </table>

        //     </div>
        // </div>

    )
}

export default ShowFactor;