
import { useEffect, useState } from "react";
import { httpService } from "@core/http-service";

const useFetchCustomers=(tableName,agentField)=>{
    
    const sinaToken = localStorage.getItem('sinaToken');
    const sessionName = localStorage.getItem('sessionName');
    const [data,setData] = useState([]);

    const getData = async (tableName,agentField) => {
        const agent_id = localStorage.getItem('agent_id');

        // const response = await httpService.post('/NetExpert/GetCRMQueries', {
        //     "sessionName": sessionName,
        //     "operation": `SELECT * FROM ${tableName} where ${agentField}=${agent_id};`, // where ${agentField}=${agent_id}
        //     "CrmRequestType": 1
        // }, { 
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": sinaToken
        //     }
        // }
        // );

        const response = await httpService.post('/crm/getData', {
            "username":"birashk@outlook.com",
            "query": `SELECT * FROM ${tableName} where ${agentField}=${agent_id}`,
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
    }, []);

    return data;    
}

export default useFetchCustomers;