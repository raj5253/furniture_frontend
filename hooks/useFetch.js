import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    const BASE_URL = "http://10.14.72.172:5000";
    // const BASE_URL = "http://192.168.72.1:5000";
    // console.log(BASE_URL);
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log("error in useFetch ", error);
      setError(true);
    } finally {
      setIsLoading(false); //finally js me bhi hota hai?
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true); //not needed as there in fetchData
    fetchData();
  };
  return { data, isLoading, error, refetch };
  // NOTE: here exporting a function, not a fucntional component
};

export default useFetch;

const styles = StyleSheet.create({});
