import axios from "axios";
import { useState , useEffect } from "react";

export default function useCategory(){
    const [categories, setCategories] = useState([]);

    //get cat
    const getCategories = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
            setCategories(data?.category);
        } 
        catch (error) {
            console.log(error);
        }
    };
    //in useEffect getCategories() calls only when there is some change made in dependency array if dependency array is empty then function calls only for first tym 
    useEffect(() => {
        getCategories();
    }, []);

    return categories;

}