"use client";
import React from 'react'
import { Button } from '@mui/material'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';

type Props = {}

const DashboardPage = (props: Props) => {
  const { logoutUser } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    try {
      logoutUser();
      router.push("/");
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <div className='flex flex-row justify-between'>
      DashboardPage
      <Button onClick={handleClick}>Log Out</Button>
    </div>
  )
}

export default DashboardPage