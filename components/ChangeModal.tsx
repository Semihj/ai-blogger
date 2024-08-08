"use client";

import React, { useState } from 'react'

export default function ChangeModal({e,isApllied}:{e:any,isApplied:any}) {

  const [text,setText] = useState()



  return (
    <>
    {isApllied ? <p> {text} </p>:<input value={e.target.textContent} onChange={(e) => setText(e.target.value)} /> } 
    </>
  )
}
