import axios from "axios";
import { useState, useEffect } from "react";

const fetch = async (name) => {
  return await axios.get(
    `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
  );
};

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

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name !== "") {
      (async () => {
        try {
          const data = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`);
          setCountry({ data:data.data, found: true });
        } catch (err) {
          setCountry({ found: false });
        }
      })();
    } else {
      setCountry(null);
    }
  }, [name]);
  

  return country;
};
