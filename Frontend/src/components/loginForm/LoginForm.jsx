import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => {
        const userInfo ={
            email: data.email,
            password: data.password
        }
        axios.post("http://localhost:8000/login",userInfo)
        .then((res)=>{
            if(res.data){
                toast.success(res.data.message);
            }
            localStorage.setItem("User",JSON.stringify(res.data.user));
            setTimeout(() => {
                window.location.replace("/");
            },2000)
        }).catch((error)=>{
            if(error){
                toast.error(error.response.data);
            }
        })
      }

    return (
        <div >
            <dialog id="my_modal_3" className="modal ">
                <div className="modal-box dark:bg-slate-900 dark:text-slate-50">
                    <form method="dialog">
                        <button  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <h2>Login</h2>
                        <div className="p-4 space-y-5 ">
                            <div>
                                <span className="label-text dark:text-slate-50">E-mail</span>
                                <label className="input input-bordered flex items-center gap-2 dark:border-gray-200 dark:bg-slate-900 dark:text-slate-50">
                                    <svg
                                         xmlns="http://www.w3.org/2000/svg" 
                                         viewBox="0 0 16 16" 
                                         fill="currentColor" 
                                         className="w-4 h-4 opacity-70">
                                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                    </svg>
                                    <input 
                                    type="text" 
                                    className="grow" 
                                    placeholder="Email" 
                                    {...register("email",{required: true})}
                                    />
                                </label>
                                    {errors.email && <span className='text-red-500'>This field is required</span>}
                            </div>
                            <div>
                                <span className="label-text  dark:text-slate-50">Password</span>
                                <label className="input input-bordered flex items-center gap-2 dark:border-gray-200 dark:bg-slate-900 dark:text-slate-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 16 16" fill="currentColor" 
                                    className="w-4 h-4 opacity-70">
                                        <path 
                                            fillRule="evenodd" 
                                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" 
                                            clipRule="evenodd" />
                                        </svg>
                                    <input 
                                    type="password"
                                    className="grow"
                                    placeholder="Enter your password"
                                    {...register("password",{required: true})}
                                    />
                                </label>
                                    {errors.password && <span className='text-red-500'>This field is required</span>}
                            </div>
                            <div className='flex  justify-between items-center'>
                                <button type='submit' className="btn btn-secondary">
                                    Login
                                </button>
                                <h2>Don't have an account?<Link to="/register" className='text-green-500 cursor-pointer'> Register Now!</Link></h2>

                            </div>
                        </div>   
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default LoginForm;