import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

import API from './apiservice.js'

export default function HomePage() {
    const DomainRef=useRef('')
    const [invalid,SetInvalid]=useState(false)
    const [loading,setLoading]=useState(false)
    const [ready,SetReady]=useState(false)
    const [show,SetShow]=useState(false)
    const [errshow,SetError]=useState(false)
    const urlRegex = /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/;

    const handlesubmit=async()=>{
        if(!urlRegex.test(DomainRef.current)){
            SetInvalid(true)
            return
        }
        setLoading(true)
        SetReady(false)
        let userid=await localStorage.getItem('userid-word-count')
        if(!userid){
            userid=uuidv4()
            localStorage.setItem('userid-word-count',userid)
        }
        let res=await API.Create(DomainRef.current,userid)
        console.log(res)
        if(res){
            SetShow(true)
            setLoading(false)
            SetReady(true)
            
        }
        else{
            SetError(true)
            setLoading(false)
        }
    }
  return (
   <>
    <div id="header-div" class="">
       <h1 class="">WORD COUNT</h1>
     </div>
    
     <div id="content-div">
       <div id="input-div">
         <input 
         onChange={i=>{DomainRef.current=i.target.value
            SetError(false)
            SetReady(false)
            SetInvalid(false)
        }}
          type="text" class="text-field content-row" placeholder="Enter URL here . . ." id="input-field" required/>
         <button id="shorten" type="button" class="content-row button"
         onClick={handlesubmit}>Get Insight</button>
         {/* <button type="button" id="clear-btn" class="content-row button">Clear</button> */}
       </div>
      {loading&&<div class="range"></div>}
       {ready&&<div id="output-div">
         <div class="content-row" id="new-url-label">Know The Word count</div>
            <Link to='/track'>CLICK HERE</Link>
       </div> }
       <div class="" id="error-div">
        { errshow&& <p class="content-row" id="error-text">unable to get insights!!!</p>}
        { invalid&& <p class="content-row" id="error-text">please enter proper url!!!</p>}
       </div>
     </div>
   
   </>
  )
}
