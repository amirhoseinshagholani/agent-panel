
import { useEffect, useState } from "react";
import { httpService } from "@core/http-service";

const useFetchDetailsOrder=(tableName,saleOrderId)=>{
    const agent_id = localStorage.getItem('agent_id');
    const sinaToken = localStorage.getItem('sinaToken');
    const sessionName = localStorage.getItem('sessionName');
    const [data,setData] = useState([]);

    const getData = async (tableName,saleOrderId) => {
        // const response = await httpService.post('/NetExpert/GetCRMQueries', {
        //     "sessionName": sessionName,
        //     "operation": `SELECT * FROM ${tableName} where id=${saleOrderId};`,
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
            "query": `SELECT * FROM ${tableName} where id=${saleOrderId}`,
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
        getData(tableName,saleOrderId);
    }, [tableName]);

    return data;    
}

export default useFetchDetailsOrder;