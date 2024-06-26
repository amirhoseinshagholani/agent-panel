import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getToken } from "@core/getToken";
import { httpService } from "@core/http-service";
import useFetchClues from "../../hooks/useFetchClues";
import useFetchProduct from "../../hooks/useFetchProducts";
import { seprateNumber } from "../../../core/seprateNumber";
import Grid from "../../../core/grid";


const ShowProducts = () => {

    const products = useFetchProduct();

    const data = products && products.map(res => (
        {
            name: res.productname,
            type: res.cf_1699,
            price: seprateNumber(parseInt(res.unit_price)),
            commissionrate:seprateNumber(parseInt(res.commissionrate))+"%"
        }
    ))

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'نام محصول',
                size: 250,
            },
            {
                accessorKey: 'type',
                header: 'نوع محصول',
                size: 150,
            },
            {
                accessorKey: 'price',
                header: 'قیمت واحد',
                size: 150,
            },
            {
                accessorKey: 'commissionrate',
                header: 'پورسانت',
                size: 150,
            },
        ],
        [],
    );

    return (
        <div className="text-gray-900 bg-gray-200 rounded rounded-t-3xl">
            <div>
                <div className="p-4 bg-gradient-to-r from-blue-200 to-blue-700 rounded-t-3xl">
                    <div className="text-xl text-white">محصولات</div>
                </div>
                <div className="px-3 py-4">
                    {
                        <Grid columns={columns} data={data} />
                    }
                </div>
            </div>
        </div>
    )
}

export default ShowProducts;