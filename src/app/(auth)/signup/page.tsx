"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/input/input";
import { Button } from "@mui/material";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { Snackbar } from "@mui/material";
import { RegisterFormValues } from "@/types/user";
import Alert from "@/components/alert";
import registerSchema from "./schema";

export default function SignupPage() {
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const { register, watch, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormValues>({ resolver: yupResolver(registerSchema) });

    const onSubmit = async () => {
        try {
            setLoading(true);
            const response: any = await axios.post("http://localhost:4000/users", {
                email: watch('email'),
                password: watch('password'),
                username: watch('username')
            })
            if (response.status === 201) {
                router.push("/dashboard");
                return;
            } else {
                setOpenAlert(true);
            }
        } catch (e) {
            console.log(e)
            setOpenAlert(true);
        } finally {
            setLoading(false);
            reset();
        }
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Link href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                        Sign up new account
                    </h1>
                    <form className="space-y-4 md:space-y-6 flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            id="username"
                            type="text"
                            {...register('username')}
                            label="User Name"
                            error={errors.username?.message}
                            required
                        />
                        <Input
                            id="email"
                            type="text"
                            {...register('email')}
                            label="Email"
                            error={errors.email?.message}
                            required
                        />

                        <Input
                            id="password"
                            type="password"
                            {...register('password')}
                            error={errors.password?.message}
                            label="Password"
                            required
                        />

                        <Input
                            id="password-confirm"
                            type="password"
                            {...register('password_confirm')}
                            error={errors.password_confirm?.message}
                            label="Confirm Password"
                            required
                        />

                        <Button
                            type="submit"
                            disabled={buttonDisabled}
                            disableRipple
                        >
                            Signup here!
                        </Button>

                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Have already an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Visit Login page</Link>
                        </p>
                    </form>
                    <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                            SignUp Failed.
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </div>
    )
}
