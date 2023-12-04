"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { User } from "@/app/types/user";
import { Input } from "@/app/components/Input/input";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import {Snackbar} from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface FormValues {
  email: string,
  password: string
}

// yup schema
const schema = yup.object().shape({
  email: yup.string().email("Email must be a valid email").required("Email is required."),
  password: yup.string()
    .required("Password is required.")
    .min(8, 'At least 8 chars')
    .matches(/[a-z]/, 'At least one lowercase char')
    .matches(/[A-Z]/, 'At least one uppercase char')
    .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'At least 1 number or special char (@,!,#, etc).')
})


export default function LoginPage() {
  const router = useRouter();
  const [openAlert, setOpenAlert] = React.useState(false);
  const { register, watch, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({ resolver: yupResolver(schema) });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { loginUser } = useAuth();

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      console.log(data);

      const respond: any = await axios.get(`http://localhost:4000/users?email=${encodeURIComponent(watch('email'))}&password=${encodeURIComponent(watch('password'))}`)
      const user: User[] = respond.data;
      if (user.length > 0) {
        loginUser();
        router.push("/dashboard");
        return;
      } else {
        reset();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setOpenAlert(true);
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
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6 flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
            <Input
              // ref={inputRef}
              id="email"
              type="text"
              {...register('email')}
              label="Email"
              error={errors.email?.message}
              required
              autoFocus
            />

            <Input
              id="password"
              type="password"
              {...register('password')}
              label="Password"
              error={errors.password?.message}
              required
            />

            <Button
              type="submit"
              disabled={buttonDisabled}
              disableRipple
            >
              Login here!
            </Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <Link href="/auth/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
            </p>
          </form>
          <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
              Login Failed
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  )
}
