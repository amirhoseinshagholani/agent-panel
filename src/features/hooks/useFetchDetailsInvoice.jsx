
import { useEffect, useState } from "react";
import { httpService } from "@core/http-service";

const useFetchDetailsInvoice=(tableName,InvoiceId)=>{
    const agent_id = localStorage.getItem('agent_id');
    const sinaToken = localStorage.getItem('sinaToken');
    const sessionName = localStorage.getItem('sessionName');
    const [data,setData] = useState([]);

    const getData = async () => {
        const response = await httpService.post('/NetExpert/GetCRMQueries', {
            "sessionName": sessionName,
            "operation": `SELECT * FROM ${tableName} where id=${InvoiceId};`,
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

export default useFetchDetailsInvoice;