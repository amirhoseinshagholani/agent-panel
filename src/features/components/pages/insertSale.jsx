import { useEffect, useMemo, useState } from "react";
import useFetchClues from "../../hooks/useFetchClues";
import useFetchProduct from "../../hooks/useFetchProducts";
import { seprateNumber } from "../../../core/seprateNumber";
import { useForm } from "react-hook-form";
import { useSubmit } from "react-router-dom";
import { httpService } from "../../../core/http-service";
import useFetchCustomers from "../../hooks/useFetchCustomers";
import Grid from "../../../core/grid";

const InsertSale = () => {
    const agent_id = localStorage.getItem('agent_id');


    // const clues = useFetchClues('Leads', 'cf_1675');
    const customers = useFetchCustomers('Contacts', 'cf_1677');

    const product = useFetchProduct();

    const [productValue, setProductValue] = useState('');
    const handleProductChange = (event) => {
        setProductValue(event.target.value);
    };

    const [amounttValue, setAmountValue] = useState(0);     //برای دریافت مقدار یا تعداد استفاده می شود
    const handleAmountChange = () => {
        const value = document.getElementById('amount').value;
        setAmountValue(value);
    }

    const [discountValue, setDiscountValue] = useState(0);      //از این استیت برای دریافت میزان تخفیف استفاده می شود
    const handleDiscountChange = () => {
        const value = document.getElementById('discount').value;
        setDiscountValue(value);
    }

    const [total, setTotal] = useState(0);           //جهت نمایش جمع کل مبلغ از این استیت استفاده می شود

    const [productList, setProductList] = useState([]);
    const [itemsList, setItemsList] = useState([]);



    const addItem = () => {

        if (productValue == "" || amounttValue == "" || amounttValue == 0) {
            alert("اطلاعات را به طور کامل وارد کنید");
            return false;
        }
        var price;
        var productname;
        var producttype;
        var tax;
        var totalRow = 0;
        var discount = discountValue || 0;
        console.log(product);
        product.map(res => {
            if (res.id == productValue) {
                price = res.unit_price;
                productname = res.productname;
                producttype = res.cf_1699;
                tax = parseInt(price * 0.1);
                totalRow = (parseInt(price) + parseInt(tax) - parseInt(discount)) * amounttValue;
                setTotal((prevArray) => parseInt(totalRow) + parseInt(prevArray));
            }
        })
        const item = {
            "index": productList.length,
            "ProductName": productname,
            "producttype": producttype,
            "price": price,
            "amount": amounttValue,
            "discount": discountValue || 0
        }
        const itemForInsert = {
            "productid": productValue,
            "listprice": price,
            "quantity": amounttValue,
            "tax1": 10,
            "discount_amount": discountValue || 0
        }
        setProductList((prevArray) => [...prevArray, item]);
        setItemsList((prevArray) => [...prevArray, itemForInsert]);
        setProductValue('');
        setAmountValue(0);
        setDiscountValue(0);
    };

    // useEffect(() => {
    //     console.log(productList);
    // }, [productList])

    const { register, handleSubmit } = useForm();
    const submitForm = useSubmit();

    const onSubmit = (data) => {
        if (itemsList.length === 0) {
            alert("هیچ آیتمی جهت ثبت سفارش انتخاب نشده است");
            return false;
        }
        data.LineItems = JSON.stringify(itemsList);
        submitForm(data, { method: "post" });

        setTimeout(() => {
            const inputs = document.querySelectorAll('input[type="text"], textarea,select');
            inputs.forEach(input => {
                input.value = '';
            });

            setProductValue('');
            setAmountValue(0);
            setDiscountValue(0);
            setProductList([]);
            setItemsList([]);
            setTotal(0);
        }, 2000)
    }

    const [typeOfCustomer, setTypeOfCustomer] = useState();
    const handleTypeCustomer = () => {
        // const selectedobj = document.querySelector("#selectedCustomer option:checked");
        // setTypeOfCustomer(selectedobj.getAttribute('data-status'));
        // typeOfCustomer && console.log(typeOfCustomer);
    }

    // const deleteItem=(itemToDelete)=>{
    //     const tempItemList = itemsList.filter(res => res.productid !== itemToDelete);
    //     setItemsList(tempItemList);
    //     // setProductList(tempItemList);
    // }

    const deleteItem = (index) => {
        console.log(index);
        const updatedProductList = productList.filter((_, i) => i !== index);
        const updatedItemsList = itemsList.filter((_, i) => i !== index);
        setProductList(updatedProductList);
        setItemsList(updatedItemsList);

        // بروزرسانی مجموع کل
        let newTotal = 0;
        updatedProductList.forEach(item => {
            const itemTotal = (parseInt(item.price) + parseInt(item.price * 0.1) - parseInt(item.discount)) * item.amount;
            newTotal += itemTotal;
        });
        setTotal(newTotal);
    }

    const data = productList && productList.map(res => (
        {
            product: res.ProductName,
            producttype: res.producttype,
            price: seprateNumber(parseInt(res.price)),
            tax: seprateNumber(parseInt(res.price * 0.1)),
            amount: res.amount,
            discount: seprateNumber(parseInt(res.discount))
        }
    ))



    console.log(data);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'product',
                header: 'نام محصول',
                size: 250,
            },
            {
                accessorKey: 'producttype',
                header: 'نوع محصول',
                size: 100,
            },
            {
                accessorKey: 'price',
                header: 'قیمت واحد',
                size: 150,
            },
            {
                accessorKey: 'tax',
                header: 'مالیات',
                size: 150,
            },
            {
                accessorKey: 'amount',
                header: 'تعداد',
                size: 100,
            },
            {
                accessorKey: 'discount',
                header: 'تخفیف(ریال)',
                size: 100,
            },
            {
                Header: '',
                size: 50,
                id: 'delete',
                Cell: ({ row }) => (
                    <button type="button" onClick={() => deleteItem(row.index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill text-red-600" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                        </svg>
                    </button>
                ),
            },
        ],
        [deleteItem],
    );

    return (
        <div>
            <div className="text-gray-900 bg-gray-200 rounded rounded-t-3xl">
                <div className="p-4 bg-gradient-to-r from-blue-200 to-blue-700 rounded-t-3xl">
                    <div className="text-xl text-white">فرم ثبت سفارش</div>
                </div>
            </div>
            <div className="bg-gray-200 p-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="bg-white shadow-xl p-7 mb-5">
                        <div className="font-bold bg-gradient-to-r from-orange-50 to-[#e5c834]  pt-3 pb-3 pr-5 pl-5 text-black font-bold rounded-lg">اطلاعات پایه</div>
                        <div className="grid md:grid-cols-4 mt-6 mr-6">
                            <div className="md:col-span-2">
                                <div className="mb-3">
                                    <label htmlFor="name" className="block mb-1">موضوع:</label>
                                    <input {...register('subject')} className="h-10 bg-slate-200 focus:outline-none w-full md:w-3/4 p-2 rounded rounded-lg" type="text" required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="name" className="block mb-1">مشتری:</label>
                                    <select id="selectedCustomer" {...register('customer')} onChange={handleTypeCustomer} className="h-10 text-gray-500 bg-slate-200 focus:outline-none w-full md:w-3/4 p-2 rounded rounded-lg" required>
                                        <option value="">انتخاب کنید...</option>
                                        {
                                            customers && customers.reverse().map(res => (
                                                <option key={res.id} value={[res.id, "contact"]}>{res.firstname} {res.lastname}</option>
                                            ))
                                        }
                                    </select>
                                </div>


                                <div className="mb-3">
                                    <input hidden {...register('agentId')} value={agent_id} className="h-10 bg-slate-100 focus:outline-none w-3/4 p-2 rounded rounded-lg" type="text" placeholder="نماینده" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="block mb-1">نوع سفارش:</label>
                                    <select {...register('orderType')} className="h-10 text-gray-500 bg-slate-200 focus:outline-none w-full md:w-3/4 p-2 rounded rounded-lg" required>
                                        <option value="">انتخاب کنید...</option>
                                        <option value="سیم کارت+IP ثابت+بسته اولیه+مودم">سیم کارت+IP ثابت+بسته اولیه+مودم</option>
                                        <option value="سیم کارت+IP ثابت+بسته اولیه">سیم کارت+IP ثابت+بسته اولیه</option>
                                        <option value="سیمکارت + IP ثابت">سیمکارت + IP ثابت</option>
                                        <option value="سیمکارت">سیمکارت</option>
                                        <option value="IP ثابت">IP ثابت</option>
                                        <option value="مودم">مودم</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-2">
                                <div className="mb-3">
                                    <label htmlFor="name" className="block mb-1">استان:</label>
                                    <input {...register('province')} className="h-10 bg-slate-200 focus:outline-none w-full md:w-3/4 p-2 rounded rounded-lg" required type="text" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="name" className="block mb-1">شهر:</label>
                                    <input {...register('city')} className="h-10 bg-slate-200 focus:outline-none w-full md:w-3/4 p-2 rounded rounded-lg" required type="text" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nampostalcodee" className="block mb-1">کد پستی:</label>
                                    <input {...register('postalcode')} className="h-10 bg-slate-200 focus:outline-none w-full md:w-3/4 p-2 rounded rounded-lg" type="text" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="block mb-1">آدرس:</label>
                                    <textarea {...register('address')} rows={2} className="h-22 bg-slate-200 focus:outline-none w-full md:w-3/4 p-2 rounded rounded-lg" required type="text" />
                                </div>
                                <div className="mt-10 mr-11 text-center">

                                </div>
                            </div>
                        </div>
                        <div className="font-bold bg-gradient-to-r from-orange-50 to-[#e5c834]  pt-3 pb-3 pr-5 pl-5 text-black font-bold rounded-lg">آیتم ها</div>
                        <div className="mt-12 mr-12">
                            <div className="grid md:grid-cols-5">
                                <div className="md:col-span-2 mb-3">
                                    <label htmlFor="name" className="block mb-1">محصول:</label>
                                    <select {...register('productName')}
                                        id="productName"
                                        value={productValue}
                                        onChange={handleProductChange}
                                        className="h-10 text-gray-500 bg-slate-200 focus:outline-none w-full md:w-3/4 p-2 rounded rounded-lg"
                                    >
                                        <option value="">انتخاب کنید...</option>
                                        {product &&
                                            product.map((res) => (
                                                <option key={res.id} value={res.id}>
                                                    {res.productname}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="md:col-span-1 mb-3">
                                    <label htmlFor="name" className="block mb-1">تعداد:</label>
                                    <input {...register('amount')} id="amount" onChange={handleAmountChange} value={amounttValue} className="h-10 bg-slate-200 focus:outline-none w-full md:w-3/4 p-2 rounded rounded-lg text-gray-500" type="number" placeholder="تعداد" />
                                </div>
                                <div className="col-span-1 mb-3">
                                    <label htmlFor="name" className="block mb-1">تخفیف(ریال):</label>
                                    <input {...register('discount')} id="discount" onChange={handleDiscountChange} value={discountValue} className="h-10 bg-slate-200 focus:outline-none w-full md:w-3/4 p-2 rounded rounded-lg text-gray-500" type="number" placeholder="تخفیف" />
                                </div>
                                <div className="flex items-end col-span-1 mb-3">
                                    <button onClick={addItem} className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out pt-3 pb-3 pr-5 pl-5 text-white font-bold rounded-lg" type="button" >
                                        افزودن
                                    </button>
                                </div>
                            </div>
                            <div className="md:px-3 md:py-4">
                                {
                                    <Grid columns={columns} data={data} />
                                }
                            </div>

                            <div className="mb-3">
                                <label htmlFor="name" className="block mb-1">مبلغ کل:</label>
                                <input {...register('total')} id="amount" onChange={handleAmountChange} value={seprateNumber(total)} readOnly className="h-10 bg-slate-300 focus:outline-none w-full md:w-1/4 p-2 rounded rounded-lg text-gray-500" type="text" placeholder="مقدار" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out pt-3 pb-3 pr-5 pl-5 text-white font-bold rounded-lg" type="submit">ثبت سفارش</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default InsertSale;

export async function submitInsertSaleOrder({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const customer = data.customer.split(",");

    var currentOrder = '';
    if (customer[1] == "clue") {
        currentOrder = `{
            "subject":"${data.subject}",
            "cf_1463":"123",
            "cf_1431":"${customer[0]}",  
            "cf_1679":"${data.agentId}",
            "ship_state":"${data.province}",
            "bill_city":"${data.city}",
            "bill_street":"${data.address}",
            "sostatus":"Created",
            "cf_1471":"${data.orderType}",
            "bill_code":"${data.postalcode}",
            "productid":"${data.productName}",
            "LineItems":${data.LineItems},
            "hdnTaxType":"individual"
        }`;
    } else if (customer[1] == "contact") {
        currentOrder = `{
            "subject":"${data.subject}",
            "cf_1463":"123",
            "contact_id":"${customer[0]}",  
            "cf_1679":"${data.agentId}",
            "ship_state":"${data.province}",
            "bill_city":"${data.city}",
            "bill_street":"${data.address}",
            "sostatus":"Created",
            "cf_1471":"${data.orderType}",
            "bill_code":"${data.postalcode}",
            "productid":"${data.productName}",
            "LineItems":${data.LineItems},
            "hdnTaxType":"individual"
        }`;
    }

    const sinaToken = localStorage.getItem('sinaToken');
    const sessionName = localStorage.getItem('sessionName');

    console.log(sessionName);
    if (currentOrder) {
        const response_insertSale = await httpService.post('/NetExpert/RegisterCrmTicket', {
            "sessionName": sessionName,
            "operation": `create`,
            "element": currentOrder,
            "elementType": "SalesOrder",
            "CrmRegisterRequestType": 1
        }, {
            headers: {
                "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
                "Authorization": sinaToken
            }
        });
        console.log(response_insertSale);
        alert("سفارش مورد نظر ثبت شد");
        return response_insertSale.status == 200;
    }

    return false;
}