
import { useEffect, useState } from "react";
import { httpService } from "@core/http-service";

const useFetchFactor=(tableName,agentField)=>{
    const agent_id = localStorage.getItem('agent_id');
    const sinaToken = localStorage.getItem('sinaToken');
    const sessionName = localStorage.getItem('sessionName');
    const [data,setData] = useState([]);

    const getData = async (tableName,agentField) => {
        // const response = await httpService.post('/NetExpert/GetCRMQueries', {
        //     "sessionName": sessionName,
        //     "operation": `SELECT subject,cf_1708,createdtime,hdnGrandTotal,pre_tax_total,received,balance FROM ${tableName} where ${agentField}=${agent_id};`,
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
            "query": `SELECT subject,cf_1708,createdtime,hdnGrandTotal,pre_tax_total,received,balance FROM ${tableName} where ${agentField}=${agent_id}`,
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

export default useFetchFactor;