import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getToken } from "@core/getToken";
import { httpService } from "@core/http-service";
import useFetchClues from "../../hooks/useFetchClues";
import { useMemo } from 'react';
import Grid from "../../../core/grid";


const ShowClues = () => {

    const clues = useFetchClues('Leads', 'cf_1675');
    // console.log(clues);
    const data = clues && clues.map(res => (
        {
            name: {
                firstName: res.firstname,
                lastName: res.lastname,
            },
            mobile: res.mobile,
            melliCode: res.cf_1447,
            state: res.state,
            city: res.city,
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

    return (
        <div className="text-gray-900 bg-gray-200">
            <div className="p-4 flex ">
                <h1 className="text-xl">مشتریان من</h1>
            </div>
            <div className="px-3 py-4">
                {
                    <Grid columns={columns} data={data} />
                }
            </div>
        </div>

    )
}

export default ShowClues;