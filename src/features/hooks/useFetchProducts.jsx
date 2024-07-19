
import { useEffect, useState } from "react";
import { httpService } from "@core/http-service";

const useFetchProduct = (tableName) => {

    const [data, setData] = useState([]);

    const getData = async (tableName) => {
        const sessionName = await localStorage.getItem('sessionName');

        const response = await httpService.post('/crm/getData', {
            "sessionName":sessionName,
            "query": `SELECT * FROM ${tableName}`,
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        }
        );   

        // console.log(response);

        if (response) {
            setData(response.data.result)
        } else {
            return false;
        }
    }

    useEffect(() => {
        getData(tableName);
    }, [tableName]);

    return data;
}

export default useFetchProduct;