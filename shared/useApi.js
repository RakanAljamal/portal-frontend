import React from "react";
import axios from "axios";

export const useSecretApi = (url,params) => {
    return {
        get: () => axios.get(url, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }),
        post: () => axios.post(url, params, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }),
        patch: () => axios.patch(url, params, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }),
        delete: () => axios.delete(url, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
    }};
