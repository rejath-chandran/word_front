import { BASE_URL } from "../config";
class Insight{
    async Create(url,userid){
            try{
               let res=await fetch(`${BASE_URL}v1/insights`,{
                method: "POST",
                body: JSON.stringify({
                    domain:url,
                    userId: userid
                }),
                 
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
               })
              return  res?.status=='200'?true:false
            }catch(error){
                    return false
            }
    }
    async GetAll(){
        let userid=await localStorage.getItem('userid-word-count')
        try{
            let res=await fetch(`${BASE_URL}v1/insights/${userid}`)
           let data= await res.json()
            if(data.status){
                return data.data
            }
            else{
                return false
            }
        }catch(error){
            return false
        }
    }
    async UpdateToFav(id){
        try{
            let res=await fetch(`${BASE_URL}v1/insights`,{
                method: "PATCH",
                body: JSON.stringify({
                    id:id,
                }),
                 
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
               })
               if(res.status===200){
                return true
               }
               else{
                return false
               }
        }catch(error){
            return false 
        }
    }
    async DeleteInsight(id){
        try{
            let res=await fetch(`${BASE_URL}v1/insights`,{
                method: "DELETE",
                body: JSON.stringify({
                    id:id,
                }),
                 
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
               })
               if(res.status===200){
                return true
               }
               else{
                return false
               }
        }catch(error){
            return false 
        }
    }
}

export default new Insight