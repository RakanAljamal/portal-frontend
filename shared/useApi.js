import React, { useEffect, useState } from "react";
import axios from "axios";

export const apiMethods = { get: "GET", post: "POST", patch: "PATCH" };
export const useApi = (url, method = apiMethods.get, params = {}) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    const fetchApi = () => {
       axios.get(url)
            .then(response => {
                return response.data;
            })
            .then(json => {
                setLoading(false)
                setData(json)
            })
    };

    const createApi = () => {
    };

    useEffect(() => {
        switch (method) {
            case apiMethods.get:
                fetchApi()
                break;
            case apiMethods.post:
                createApi()
                break;
            default:
                throw new Error('Method not supported');

        }
    }, []);

    return { loading, data }
};
