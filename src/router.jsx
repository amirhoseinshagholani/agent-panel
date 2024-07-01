import { BrowserRouter, Route, Routes, createBrowserRouter } from "react-router-dom";
import Login, { loginAction } from "./features/components/login";
import Profile from "./features/components/pages/profile";
import MainLayout from "./features/components/main-layout";
import InsertContact, { submitInsertContact } from "./features/components/pages/insertContact";
import ShowClues from "./features/components/pages/showClues";
import InsertSale, { submitInsertSaleOrder } from "./features/components/pages/insertSale";
// import ShowInvoice from "./features/components/pages/showInvoice";
import ShowFactor from "./features/components/pages/showFactor";
import ShowCommission from "./features/components/pages/showCommission";
import ShowPreFactor from "./features/components/pages/showPreFactor";
import ShowDetailsPreFactor from "./features/components/pages/showDetailsPreFactor";
import ShowCustomers from "./features/components/pages/showCustomers";
import ShowDetailsFactor from "./features/components/pages/showDetailsFactor";
import ShowProducts from "./features/components/pages/showProducts";
import Example from "./features/components/pages/example";
import UploadFiles, { submitUploadFiles } from "./features/components/pages/uploadFiles";
import EditSale from "./features/components/pages/editSale";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Login/>,
        action: loginAction
    },
    {
        path:'/panel',
        element:<MainLayout/>,
        children:[{
            element:<Profile/>,
            index:true
        },
        {
            path:'insertContact',
            element:<InsertContact/>,
            action:submitInsertContact
        },
        {
            path:'showClues',
            element:<ShowClues/>
        },
        {
            path:'showProducts',
            element:<ShowProducts/>
        },
        {
            path:'insertSale',
            element:<InsertSale/>,
            action:submitInsertSaleOrder
        },
        {
            path:'editSale',
            element:<EditSale/>
        },
        {
            path:'showPreFactor',
            element:<ShowPreFactor/>
        },
        {
            path:'showFactor',
            element:<ShowFactor/>
        },
        {
            path:'showCommission',
            element:<ShowCommission/>
        },
        {
            path:'showCustomers',
            element:<ShowCustomers/>
        },
        {
            path:'showPreFactor/details/:id',
            element:<ShowDetailsPreFactor/>
        },
        {
            path:'showFactor/details/:id',
            element:<ShowDetailsFactor/>
        },
        {
            path:'uploadFiles',
            element:<UploadFiles/>,
            action:submitUploadFiles
        }
    ]
    }
])


export default router;



