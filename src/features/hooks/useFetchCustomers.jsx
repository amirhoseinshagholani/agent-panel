import { useEffect, useState } from "react";
import { httpService } from "@core/http-service";

const useFetchCustomers = (tableName, agentField) => {
  const [data, setData] = useState([]);

  const getData = async (tableName, agentField) => {
    const agent_id = localStorage.getItem("agent_id");

    // const response_getSessionName = await httpService.post('/crm/getSessionName', {
    //     "username":"birashk@outlook.com",
    // }, {
    //     headers: {
    //         "Content-Type": "application/json",
    //     }
    // }
    // );

    const sessionName = await localStorage.getItem('sessionName');

    
console.log("sessionName:"+sessionName);
// return;
    const response = await httpService.post("/crm/getData",
      {
        "sessionName":sessionName,
        "query": `SELECT * FROM ${tableName} where ${agentField}=${agent_id}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response);
    if (response) {
      setData(response.data.result);
    } else {
      return false;
    }
  };

  useEffect(() => {
    getData(tableName, agentField);
  }, [tableName]);

  // console.log(data);
  return data;
};

export default useFetchCustomers;
