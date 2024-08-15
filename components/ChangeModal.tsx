"use client";

import React, { useState } from 'react'

export default function ChangeModal({e,isApplied}:{e:any,isApplied:any}) {

  const [text,setText] = useState()



  return (
    <>
    {isApplied ? <p> {text} </p>:<input value={e.target.textContent} onChange={(e:any) => setText(e.target.value)} /> } 
    </>
  )
}
