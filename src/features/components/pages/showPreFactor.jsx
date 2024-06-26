import { useEffect, useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { getToken } from "@core/getToken";
import { httpService } from "@core/http-service";
import useFetchSalesOrder from "../../hooks/useFetchSalesOrder";
import { seprateNumber } from "../../../core/seprateNumber";
import { to_jalali } from "../../../core/gregoriToJalali";
import Grid from "../../../core/grid";
import SvgShowDetails from "../svg/svgShowDetails";


const ShowPreFactor = () => {

    const salesOrder = useFetchSalesOrder('SalesOrder', 'cf_1679');
    console.log(salesOrder);
    const data = salesOrder && salesOrder.reverse().map(res => (
        {
            subject: res.subject,
            customer: res.cf_1704 || res.cf_1706,
            createdtime: to_jalali(res.createdtime),
            hdnGrandTotal: seprateNumber(parseInt(res.hdnGrandTotal)),
            tax: seprateNumber(parseInt(res.pre_tax_total * 0.1)),
            linkDetails: '/panel/showPreFactor/details/jkdojdl7d98547q!@gh%' + res.id + '*p)8d$#ss@14203ddef'
        }
    ))

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
                size: 200,
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
            },
        ],
        [],
    );

    // useEffect(() => {
    //     console.log(salesOrder);
    // }, [salesOrder])

    return (
        <div className="text-gray-900 bg-gray-200 rounded rounded-t-3xl">
            <div>
                <div className="p-4 bg-gradient-to-r from-blue-200 to-blue-700 rounded-t-3xl">
                    <div className="text-xl text-white">سفارشات ثبت شده</div>
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
        //         <h1 className="text-2xl">سفارشات ثبت شده</h1>
        //     </div>
        //     <div className="px-3 py-4 flex">
        //         <table className="w-full text-md bg-white shadow-md rounded mb-4 overflow-y-auto">
        //             <tbody>
        //                 <tr className="border-b bg-blue-300 text-sm">
        //                     <th className="text-right p-3 px-5">موضوع</th>
        //                     <th className="text-right p-3 px-5">مشتری</th>
        //                     <th className="text-right p-3 px-5">تاریخ ثبت</th>
        //                     <th className="text-right p-3 px-5">جمع کل</th>
        //                     <th className="text-right p-3 px-5">مالیات</th>
        //                     <th className="text-right p-3 px-5"></th>
        //                 </tr>
        //                 {
        //                     // saleOrders && (
        //                     //     console.log(saleOrders)        
        //                     // )
        //                     salesOrder && (
        //                         salesOrder.reverse().map((res) => (
        //                             <tr key={res.id} className="border-b hover:bg-orange-100 text-sm bg-gray-100">
        //                                 <td className="p-3 px-5">
        //                                     <input type="text" value={res.subject} className="bg-transparent outline-none border-gray-300 py-2" />
        //                                 </td>
        //                                 <td className="p-3 px-5">
        //                                     <input type="text" value={res.cf_1704} className="bg-transparent outline-none border-gray-300 py-2" />
        //                                 </td>
        //                                 <td className="p-3 px-5">
        //                                     <input type="text" value={to_jalali(res.createdtime)} className="bg-transparent outline-none border-gray-300 py-2" />
        //                                 </td>
        //                                 <td className="p-3 px-5">
        //                                     <input type="text" value={seprateNumber(parseInt(res.hdnGrandTotal))} className="bg-transparent outline-none border-gray-300 py-2" />
        //                                 </td>
        //                                 <td className="p-3 px-5">
        //                                     <input type="text" value={seprateNumber(parseInt(res.pre_tax_total * 0.1))} className="bg-transparent outline-none border-gray-300 py-2" />
        //                                 </td>
        //                                 <td className="p-3 px-5">
        //                                     <Link to={`/panel/showPreFactor/details/jkdojdl7d98547q!@gh%${res.id}*p)8d$#ss@14203ddef`}>
        //                                         <svg xmlns="http://www.w3.org/2000/svg" height="16" fill="currentColor" viewBox="0 0 16 16">
        //                                             <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2zm5 10v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2v5a2 2 0 0 1-2 2z" />
        //                                         </svg>
        //                                     </Link>
        //                                 </td>
        //                             </tr>
        //                         )
        //                         )
        //                     )
        //                 }
        //             </tbody>
        //         </table>

        //     </div>
        // </div>

    )
}

export default ShowPreFactor;