import React, { useEffect, useState } from 'react'
import '../App.css'
import API from './apiservice.js' 
import { Trash3 ,HeartFill} from 'react-bootstrap-icons';


export default function Track() {
    const [data,SetData]=useState([])
    const [load,SetLoad]=useState(true)
    let apicall=async()=>{
        let data=await API.GetAll()
        SetData(data)
    }
    const AddToFav=async(id)=>{
            let res=await API.UpdateToFav(id)
            if(res){
                SetLoad(prev=>!prev)
            }
    }
    const Delete=async(id)=>{
            let res=await API.DeleteInsight(id)
            if(res){
                SetLoad(prev=>!prev)
            }
    }
    useEffect(()=>{
        apicall()
    },[load])
  return (
  <>
  <div class="container">
  <div class="row">
    <div class="col-12">
      <table class="table table-bordered">
        <thead>
          <tr>
            {/* <th scope="col">Day</th> */}
            <th scope="col">Domain Name</th>
            <th scope="col">Word Count</th>
            <th scope="col">Fav</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
       {
        data.map(i=>(   <tr>
            
            <td>{i.DomainName}</td>
            <td>{i.WordCount}</td>
            <td>{i.fav?'true':'false'}</td>
            <td>
              <button type="button" class="btn btn-primary"
              onClick={()=>AddToFav(i._id)}>
                <HeartFill/>
              </button>
             
            <button type="button" class="btn btn-danger"
            onClick={()=>Delete(i._id)}>
                <Trash3/>
            </button>
            </td>
          </tr>
          ))
       }
        
        </tbody>
      </table>
    </div>
  </div>
</div>
  
  </>
  )
}
