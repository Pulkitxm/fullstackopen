import { useState, useEffect } from "react";
import axios from "axios";

const fetch = async (baseUrl) => await axios.get(baseUrl).then((res) => res.data);
const post = async (baseUrl,data) => await axios.post(baseUrl,data).then((res) => res);

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(()=>{
      fetch(baseUrl).then(res=>setResources(res))
  },[setResources,baseUrl])
  
  const create = (resource) => {
    const res = post(baseUrl,resource)
    res.then(i=>{
        setResources(resources.concat(i.data))
    })
  };

  const service = {
    create,
  };

  return [resources, service];
};
