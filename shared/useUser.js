import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export const useUser = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    useEffect(() => {
        axios.get('http://localhost:3000/user/me', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(response => {
                setUser(response.data)
                setLoading(false);
                router.push('/')
        }).catch(err=>{
            setLoading(false);
            router.push('/login')
        })
    }, [])


    return { user, loading }

}
