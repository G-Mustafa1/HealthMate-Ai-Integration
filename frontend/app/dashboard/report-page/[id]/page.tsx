"use client";

import React from 'react'
import { useParams } from 'next/navigation'

const ReportPage = () => {
    const prrams = useParams();
    console.log(prrams);
  return (
    <div>
      <h1>Report: {prrams.id}</h1>
    </div>
  )
}

export default ReportPage
