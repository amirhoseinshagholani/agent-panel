import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getToken } from "@core/getToken";
import { httpService } from "@core/http-service";
import useFetchCustomers from "../../hooks/useFetchCustomers";
import Grid from "../../../core/grid";


const ShowCustomers =  () => {

    const customers = useFetchCustomers('Contacts', 'cf_1677');

    const data = customers && customers.reverse().map(res => (
        {
            name: {
                firstName: res.firstname,
                lastName: res.lastname,
            }, 
            mobile: res.mobile,
            melliCode: res.cf_1447,
            state: res.mailingstate,
            city: res.mailingcity,
        }
    ))

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name.firstName',
                header: 'نام',
                size: 150,
            },
            {
                accessorKey: 'name.lastName',
                header: 'نام خانوادگی',
                size: 150,
            },
            {
                accessorKey: 'mobile',
                header: 'شماره موبایل',
                size: 200,
            },
            {
                accessorKey: 'state',
                header: 'استان',
                size: 150,
            },
            {
                accessorKey: 'city',
                header: 'شهر',
                size: 150,
            },
        ],
        [],
    );

    useEffect(() => {
        console.log(customers)
    }, [customers])

    return (
        <div className="text-gray-900 bg-gray-200 rounded rounded-t-3xl">
            <div>
                <div className="p-4 bg-gradient-to-r from-blue-200 to-blue-700 rounded-t-3xl">
                    <div className="text-xl text-white">مشتریان من</div>
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

export default ShowCustomers;