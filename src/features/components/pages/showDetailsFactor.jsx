import { useParams } from "react-router-dom";
import useFetchDetailsOrder from "../../hooks/useFetchDetailsOrder";
import { useEffect, useMemo, useState } from "react";
import { seprateNumber } from "../../../core/seprateNumber";
import useFetchDetailsInvoice from "../../hooks/useFetchDetailsInvoice";
import useFetchProduct from "../../hooks/useFetchProducts";
import fetchProduct from "../../hooks/useFetchProducts";
import { httpService } from "@core/http-service";
import Grid from "../../../core/grid";

const ShowDetailsFactor = () => {

    const { id } = useParams();

    const decrypt = (id) => {
        const step1 = id.split('%');
        const step2 = step1[1].split('*');
        return step2[0];
    }

    const detailsFactor = useFetchDetailsInvoice('Invoice', decrypt(id));
    const products = useFetchProduct();

    useEffect(() => {
        console.log(detailsFactor);
    }, [detailsFactor])

    const getProductName = (id) => {
        const product = products.find(res => res.id === id);
        return product ? product.productname : 'نامشخص';
    }


    const data = detailsFactor && detailsFactor.map(res => (
        {
            name: getProductName(res.productid),
            price: seprateNumber(parseInt(res.listprice)),
            quantity : seprateNumber(parseInt(res.quantity)),
            tax: seprateNumber(parseInt(res.listprice * res.quantity * 0.1)),
            discount:seprateNumber(parseInt(res.discount_amount || 0)),
            total: seprateNumber(parseInt((res.listprice * res.quantity)+(res.listprice * res.quantity * 0.1)-(res.discount_amount)))
        }
    ))

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'نام محصول',
                size: 300,
            },
            {
                accessorKey: 'price',
                header: 'قیمت واحد(ریال)',
                size: 200,
            },
            {
                accessorKey: 'quantity',
                header: 'تعداد',
                size:150
            },
            {
                accessorKey: 'tax',
                header: 'مالیات(ریال)',
                size: 150,
            },
            {
                accessorKey:'discount',
                header:'تخفیف(ریال)',
                size:150
            },
            {
                accessorKey:'total',
                header:'جمع کل(ریال)',
                size:200
            }
        ],
        [],
    );

    return (

        <div className="text-gray-900 bg-gray-200 rounded rounded-t-3xl">
            <div>
                <div className="p-4 bg-gradient-to-r from-blue-200 to-blue-700 rounded-t-3xl">
                    <div className="text-xl text-white">جزئیات فاکتور</div>
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
        //         <h1 className="text-2xl">جزئیات فاکتور</h1>
        //     </div>
        //     <div className="px-3 py-4 flex">
        //         <table className="w-full text-md bg-white shadow-md rounded mb-4 overflow-y-auto">
        //             <tbody>
        //                 <tr className="border-b bg-blue-300 grid grid-cols-3 text-sm">
        //                     <th className="text-right p-3 px-5 col-span-2">نام محصول</th>
        //                     <th className="text-right p-3 px-5 col-span-1">قیمت</th>
        //                 </tr>
        //                 {

        //                     // detailsFactor && (
        //                     //     detailsFactor.map((res) => (
        //                     //         console.log(fetchProductName(res.productid))
        //                     //     )
        //                     //     )
        //                     // )
        //                     detailsFactor && (
        //                         detailsFactor.map((res) => (
        //                             <tr key={res.id} className="border-b hover:bg-orange-100 text-sm bg-gray-100 grid grid-cols-3">
        //                                 <td className="p-3 px-5 col-span-2">
        //                                     <input type="text" value={getProductName(res.productid)} className="bg-transparent outline-none border-gray-300 py-2 w-full" />
        //                                 </td>
        //                                 <td className="p-3 px-5 col-span-1">
        //                                     <input type="text" value={seprateNumber(parseInt(res.listprice))} className="bg-transparent outline-none border-gray-300 py-2" />
        //                                 </td>
        //                             </tr>
        //                         )
        //                         )
        //                     )
        //                 }
        //             </tbody>
        //         </table>
        //     </div>
        //     {/* <div className="p-2 flex justify-end">
        //         <div className="p-5 bg-red-500 w-fit h-5 flex items-center text-white rounded rounded-lg hover:bg-red-700 text-sm">
        //             <a href="#">بازگشت</a>
        //         </div>
        //     </div> */}
        // </div>
    )
}

export default ShowDetailsFactor;