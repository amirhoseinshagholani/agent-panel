
import { useEffect, useState } from "react";
import { httpService } from "@core/http-service";

const useFetchFactor=(tableName,agentField)=>{
    const agent_id = localStorage.getItem('agent_id');
    const sinaToken = localStorage.getItem('sinaToken');
    const sessionName = localStorage.getItem('sessionName');
    const [data,setData] = useState([]);

    const getData = async () => {
        const response = await httpService.post('/NetExpert/GetCRMQueries', {
            "sessionName": sessionName,
            "operation": `SELECT subject,cf_1708,createdtime,hdnGrandTotal,pre_tax_total,received,balance FROM ${tableName} where ${agentField}=${agent_id};`,
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

export default useFetchFactor;