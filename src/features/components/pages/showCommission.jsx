import { useEffect, useMemo } from "react";
import useFetchCommisiun from "../../hooks/useFetchCommisiun";
import { seprateNumber } from "../../../core/seprateNumber";
import Grid from "../../../core/grid";
import { to_jalali } from "../../../core/gregoriToJalali";

const ShowCommission=()=>{

    const commisiun = useFetchCommisiun('Commission','cf_1712');

    const data = commisiun && commisiun.reverse().map(res => (
        {
            subject: res.subject,
            customer: res.cf_1716,
            createdtime: to_jalali(res.createdtime),
            salesExpert: res.cf_1724,
            amount: seprateNumber(parseInt(res.cf_1683)),
            status: res.cf_1714,
        }
    ))

    const columns = useMemo(
        () => [
            {
                accessorKey: 'subject',
                header: 'موضوع',
                size: 150,
            },
            {
                accessorKey: 'customer',
                header: 'مشتری',
                size: 150,
            },
            {
                accessorKey: 'createdtime',
                header: 'تاریخ ثبت',
                size: 200,
            },
            {
                accessorKey: 'salesExpert',
                header: 'کارشناس فروش',
                size: 200,
            },
            {
                accessorKey: 'amount',
                header: 'مبلغ پورسانت',
                size: 200,
            },
            {
                accessorKey: 'status',
                header: 'وضعیت',
                size: 200,
            }
        ],
        [],
    );
    // useEffect(() => {
    //     console.log(commisiun);
    // }, [commisiun])

    return (
        <div className="text-gray-900 bg-gray-200 rounded rounded-t-3xl">
            <div>
                <div className="p-4 bg-gradient-to-r from-blue-200 to-blue-700 rounded-t-3xl">
                    <div className="text-xl text-white">پورسانت بازاریاب</div>
                    <div className="text-xs text-white mt-3">تا زمانی که برای سفارش مورد نظر فاکتور صادر نشده باشد، پورسانت محاسبه نمی گردد</div>
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

export default ShowCommission;