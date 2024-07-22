
import { useEffect, useState } from "react";
import { httpService } from "@core/http-service";

const useFetchSalesOrder=(tableName,agentField)=>{
    const agent_id = localStorage.getItem('agent_id');
    const sinaToken = localStorage.getItem('sinaToken');
    const sessionName = localStorage.getItem('sessionName');
    const [data,setData] = useState([]);

    const getData = async (tableName) => {
        // const response = await httpService.post('/NetExpert/GetCRMQueries', {
        //     "sessionName": sessionName,
        //     "operation": `SELECT subject,contact_id,cf_1704,cf_1706,createdtime,hdnGrandTotal,pre_tax_total,cf_1471,ship_state,bill_city,bill_code,bill_street FROM ${tableName} where ${agentField}=${agent_id} and sostatus != 'فاکتور شده';`,
        //     "CrmRequestType": 1
        // }, { 
        //     headers: {
        //         "Content-Type": "application/json", 
        //         "Authorization": sinaToken
        //     }
        // }
        // );
        const sessionName = await localStorage.getItem('sessionName');

        const response = await httpService.post('/crm/getData', {
            "sessionName":sessionName,
            "query": `SELECT subject,contact_id,sostatus,cf_1704,cf_1706,createdtime,hdnGrandTotal,pre_tax_total,cf_1471,ship_state,bill_city,bill_code,bill_street FROM ${tableName} where ${agentField}=${agent_id} and sostatus != 'فاکتور شده'`,
        }, {
            headers: {
                "Content-Type": "application/json",
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
        getData(tableName,agentField);
    }, [tableName]);

    return data;    
}

export default useFetchSalesOrder;