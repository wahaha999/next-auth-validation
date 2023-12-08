"use client";
import React from 'react'
import { Button } from '@mui/material'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { resetUser } from '@/features/user';

type Props = {}

const DashboardPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const { logoutUser } = useAuth();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  const handleClick = () => {
    try {
      logoutUser();
      dispatch(resetUser());
      router.push("/");
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <div className='flex flex-row justify-between'>
      DashboardPage
      <div>
      {user.user.email}
      <Button onClick={handleClick}>Log Out</Button>
      </div>
    </div>
  )
}

export default DashboardPage