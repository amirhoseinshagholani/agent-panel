
import { useEffect, useState } from "react";
import { httpService } from "@core/http-service";

const useFetchSalesOrder=(tableName,agentField)=>{
    const agent_id = localStorage.getItem('agent_id');
    const sinaToken = localStorage.getItem('sinaToken');
    const sessionName = localStorage.getItem('sessionName');
    const [data,setData] = useState([]);

    const getData = async () => {
        const response = await httpService.post('/NetExpert/GetCRMQueries', {
            "sessionName": sessionName,
            "operation": `SELECT subject,contact_id,cf_1704,cf_1706,createdtime,hdnGrandTotal,pre_tax_total,cf_1471,ship_state,bill_city,bill_code,bill_street FROM ${tableName} where ${agentField}=${agent_id} and sostatus != 'فاکتور شده';`,
            "CrmRequestType": 1
        }, { 
            headers: {
                "Content-Type": "application/json",
                "Authorization": sinaToken
            }
        }
        );

        if(response){
            setData(response.data.result)
        }else{
            return false;
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return data;    
}

export default useFetchSalesOrder;