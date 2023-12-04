"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { User } from "@/app/types/user";
import { Input } from "@/app/components/Input/input";

export default function LoginPage() {
    const router = useRouter();
    const [userInfo, setUserInfo] = React.useState({
        email: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const { loginUser } = useAuth();
    const inputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
      if(inputRef.current) {
        inputRef.current.focus();
      }
    }, [])

    const handleClick = async () => {
        try {
            setLoading(true);
            const respond: any = await axios.get(`http://localhost:4000/users?email=${encodeURIComponent(userInfo.email)}&password=${encodeURIComponent(userInfo.password)}`)
            const user: User[] = respond.data;
            if (user.length > 0) {
                toast.success("Login Success");
                loginUser();
                router.push("/dashboard");
                return;
            }
            toast.error("Login Failed");
        } catch (e) {
            toast.error("Login Failed");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (userInfo.email.length > 0 && userInfo.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [userInfo])

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
                    <form className="space-y-4 md:space-y-6 flex flex-col items-center justify-center" action="#">
                        <Input
                            ref={inputRef}
                            id="email"
                            type="text"
                            value={userInfo.email}
                            onChange={e => setUserInfo({ ...userInfo, email: e.target.value })}
                            label="Email"
                            required
                        />

                        <Input
                            id="password"
                            type="password"
                            value={userInfo.password}
                            onChange={e => setUserInfo({ ...userInfo, password: e.target.value })}
                            label="Password"
                            required
                        />

                        <Button
                            onClick={handleClick}
                            disabled={buttonDisabled}
                            disableRipple
                        >
                            Login here!
                        </Button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <Link href="/auth/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
