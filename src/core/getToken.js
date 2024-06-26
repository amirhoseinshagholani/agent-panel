import { useState } from "react";
import { httpService } from "./http-service";

export function getToken(){

    const [token,setToken] = useState([]);

    const getdata=async()=>{
        const response_sinaToken = await httpService.post('/Authentication/LoginAsync',{
            "username":"NetXpert",
            "password":"@NetXpert#26200!551@"
            }
        );

        const response_crmToken = await httpService.post('/NetExpert/GetCRMToken',{},
            {
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":response_sinaToken.data
                }
            }
        );
    
        const response_sessionName = await httpService.post('/NetExpert/GetCRMSessionName',{
            "token":response_crmToken.data.result.token
        },{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":response_sinaToken.data
                }
            }
        );
        const getBaseData = {
            sessionName: response_sessionName.data.result.sessionName,
            sinaToken: response_sinaToken.data
        };
        return getBaseData;
    }

    getdata().then(res=>{
        localStorage.setItem('sinaToken',res.sinaToken);
        localStorage.setItem('sessionName',res.sessionName);
        return false;
    }).catch(()=>{
        return false;
    })
    // return token;
}
