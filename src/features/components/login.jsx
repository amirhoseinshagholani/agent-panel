import { useForm } from "react-hook-form";
import { Link, useActionData, useNavigate, useNavigation, useSubmit } from "react-router-dom";
import { httpService } from "../../core/http-service";
import { getToken } from "../../core/getToken";
import { useEffect } from "react";

const Login = () => {
    const submitForm = useSubmit();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        submitForm(data, { method: 'post' })
    }

    const navigation = useNavigation();
    const isSubmitting = navigation.state !== 'idle';

    const isSuccessOperation = useActionData();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccessOperation) {
            navigate('/panel')
        }
    }, [isSuccessOperation])

    return (
        <div className="container mx-auto">
            <div className="flex justify-center mt-20">
                <div>
                    <div >
                        <a href="#"><img className="mx-auto justify-center" src="/images/bMFju8REYhWOJCy.png" alt="" /></a>
                    </div>
                    <div className="bg-[#014087] pr-7 pl-7 pb-10 pt-8 rounded rounded-xl">
                        <div className="flex justify-center mb-4 text-[#ddad22] gap-1">
                            <div className="font-bold">به جهان ارتباطات نکا خوش آمدید</div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex justify-center">
                                <input {...register('mellicode', {
                                    required: 'کد ملی را وارد کنید',
                                    minLength: 10,
                                    maxLength: 10
                                })} className={`bg-slate-200 w-80 h-8 rounded rounded-xl p-3 mb-0 font-bold text-sm ${errors.mellicode && 'is-invalid'}`} type="text" placeholder="کد ملی" />
                            </div>

                            <div className="flex justify-center">
                                <input {...register('password', {
                                    required: 'رمز عبور خود ر وارد نمایید'
                                })} className={`bg-slate-200 w-80 h-8 mt-2 rounded rounded-xl p-3 mb-5 font-bold text-sm ${errors.password && 'is-invalid'}`} type="password" placeholder="رمز عبور" />
                            </div>
                            <div className="flex justify-center mt-2">
                                <div className="my-auto items-center">
                                    {/* <Link className="bg-[#ddad22] hover:bg-[#b39945] rounded rounded-lg font-bold shadow-xl pb-2 pr-6 pl-6" to="/panel">ورود</Link> */}
                                    {/* <button className={`${isSubmitting ? `bg-[#bebcbc] hover:bg-[#bebcbc]` : `bg-[#ddad55] hover:bg-[#b39945]`}  rounded rounded-lg font-bold shadow-xl pb-2 pr-6 pl-6`} type="submit">
                                        {isSubmitting ? "در حال ورود" : "ورود"}
                                    </button> */}
                                    <div className="mt-5 text-right">
                                        <button className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out pt-3 pb-3 pr-5 pl-5 text-white font-bold rounded-lg" type="submit">
                                        {isSubmitting ? "در حال ورود" : "ورود"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;

export async function loginAction({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    // const navigate = useNavigate();

    const sinaToken = localStorage.getItem('sinaToken');
    const sessionName = localStorage.getItem('sessionName');

    const response_getAgent = await httpService.post('/NetExpert/GetCRMQueries', {
        "sessionName": sessionName,
        "operation": `SELECT * FROM vtcmAgents where cf_1662=${data.mellicode} AND cf_1695=${data.password};`,
        "CrmRequestType": 1
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": sinaToken
        }
    }
    );

    // console.log(response_getAgent.data.result.length); 
    console.log(sessionName);
    if (response_getAgent.data.result.length) {
        // console.log(response_getAgent.data.result[0].id);
        localStorage.setItem('agent_id', response_getAgent.data.result[0].id);
        return response_getAgent.data.result[0];
    } else {
        alert("مخاطب مورد نظر یافت نشد");
        return false;
    }
}