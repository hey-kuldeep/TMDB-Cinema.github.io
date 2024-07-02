import axios from 'axios'
import React, { useEffect, useState } from 'react'

function useFetch(apiurl) {
    let [apidata,setapidata] = useState([]);
    let [loading,setloading] = useState(true);
    let [apierror,setapierror]=useState(false);

    let runApi=async()=>{
    try{
    let data = await axios.get(apiurl)
    setapidata(data)
    console.log(data);
    setloading(false)
    } 
    catch (error){
        setapierror(true)
        setloading(false)
    }
    }
    useEffect(()=>{
      runApi();
    },[apiurl])
    return {apidata,loading,apierror}

}

export default useFetch