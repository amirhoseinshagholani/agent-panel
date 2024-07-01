import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getToken } from "../../core/getToken";
import { httpService } from "../../core/http-service";


const MainLayout = () => {

    const getData = async (agent_id) => {
        const sinaToken = localStorage.getItem('sinaToken');
        const sessionName = localStorage.getItem('sessionName');

        const response_getAgent = await httpService.post('/NetExpert/GetCRMQueries', {
            "sessionName": sessionName,
            "operation": `SELECT * FROM vtcmAgents where id=${agent_id};`,
            "CrmRequestType": 1
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": sinaToken
            }
        }
        );
        return response_getAgent.data.result[0];
    }

    const [agent, setAgent] = useState();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const agent_id = localStorage.getItem('agent_id');
        getData(agent_id).then(res => setAgent(res));
    }, [])

    const contextValue = { agent };

    const handleSideBarShow = () => {
        setIsSidebarOpen(true)
    }

    const handleSideBarHide=()=>{
        setIsSidebarOpen(false);
    }

    return (
        <div className="grid grid-cols-6">
            <div className={`col-span-1 ${isSidebarOpen ? 'block col-span-6 md:col-span-1' : 'hidden'} md:block`}>
                <div id="sidebar" className="bg-[#014087] h-screen p-5 pl-0">
                    <div className="mx-auto text-end pt-0 pl-2 block md:hidden">
                        <button onClick={handleSideBarHide} className="bg-white shadow-lg p-2 rounded rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                            </svg>
                        </button>
                    </div>
                    <div id="logo" className="mt-1 pl-5">
                        <a href="/panel"><img className="justify-center mx-auto rounded rounded-2xl" src="/images/bMFju8REYhWOJCy.png" width={150} alt="" /></a>
                    </div>
                    <div className="text-white mt-5 font-medium text-sm pr-6">
                        <ul>
                            <a href="/panel"><li className="bg-gradient-to-l hover:from-[#014087] hover:to-[#cbd5e1]  p-4 pt-3 pb-3">پروفایل</li></a>
                            <a href="/panel/insertContact"><li className="bg-gradient-to-l hover:from-[#014087] hover:to-[#cbd5e1]  p-4 pt-3 pb-3">تعریف مشتری</li></a>
                            {/* <a href="/panel/showClues"><li className="hover:bg-slate-700 hover:outline outline-5 outline-cyan-800 p-4 pt-3 pb-3 rounded rounded-2xl">مشتریان ثبت شده</li></a> */}
                            <a href="/panel/showCustomers"><li className="bg-gradient-to-l hover:from-[#014087] hover:to-[#cbd5e1]  p-4 pt-3 pb-3">مشتریان</li></a>
                            <a href="/panel/showProducts"><li className="bg-gradient-to-l hover:from-[#014087] hover:to-[#cbd5e1]  p-4 pt-3 pb-3">لیست محصولات</li></a>
                            <a href="/panel/insertSale"><li className="bg-gradient-to-l hover:from-[#014087] hover:to-[#cbd5e1]  p-4 pt-3 pb-3">ثبت سفارش</li></a>
                            {/* <a href="/panel/editSale"><li className="bg-gradient-to-l hover:from-[#014087] hover:to-[#cbd5e1]  p-4 pt-3 pb-3">اصلاح سفارش</li></a> */}
                            {/* <a href="/panel/uploadFiles"><li className="bg-gradient-to-l hover:from-[#014087] hover:to-[#cbd5e1]  p-4 pt-3 pb-3">آپلود فایل</li></a> */}
                            <a href="/panel/showPreFactor"><li className="bg-gradient-to-l hover:from-[#014087] hover:to-[#cbd5e1]  p-4 pt-3 pb-3">مشاهده سفارشات</li></a>
                            <a href="/panel/showFactor"><li className="bg-gradient-to-l hover:from-[#014087] hover:to-[#cbd5e1]  p-4 pt-3 pb-3">مشاهده فاکتورها</li></a>
                            <a href="/panel/showCommission"><li className="bg-gradient-to-l hover:from-[#014087] hover:to-[#cbd5e1] p-4 pt-3 pb-3">مشاهده پورسانت</li></a>
                            <a href="/"><li className="bg-gradient-to-l hover:from-[#014087] hover:to-[#cbd5e1] p-4 pt-3 pb-3">خروج</li></a>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="main" className={`col-span-6 md:col-span-5 flex flex-col h-screen ${isSidebarOpen ? 'hidden md:block' : 'block'}`}>
                <nav id="navbar" className="bg-slate-700 h-10">
                    <div className="text-white p-2 pr-5 text-sm">
                        {agent && (agent.fld_vtcmagentsf1 + "، " + "به جهان ارتباطات نکا خوش آمدید")}
                    </div>
                </nav>
                <div className="bg-slate-300 p-1 block md:hidden">
                    <button onClick={handleSideBarShow} className="bg-white shadow-lg p-2 rounded rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </button>
                </div>
                <main id="content" className="bg-slate-300 flex-grow p-4 pt-0 md:p-5 overflow-scroll">
                    <Outlet context={contextValue} />
                </main>
                <footer id="footer" className="bg-slate-700 mt-auto">
                    <div dir="ltr" className="text-white p-2 pr-5 text-sm font-peyda">
                        © nekatel - <span className="text-[#ddad22]">desine by AmirHosein Shagholani</span>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default MainLayout;