import React from 'react'

type Props = {
    children:React.ReactNode
}

const DashboardLayout = ({children}: Props) => {
  return (
    <section className='m-6'>{children}</section>
  )
}

export default DashboardLayout