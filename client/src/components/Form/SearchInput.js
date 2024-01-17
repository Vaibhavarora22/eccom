import React from 'react'
import { useSearch } from '../../context/search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchInput = () => {
    const [values , setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.get(`http://localhost:8080/api/v1/product/search/${values.keyword}`);
            setValues({...values , results: data});
            navigate("/search");

        }
        catch(error){
            console.log(error);

        }

    }
  return (
    <>
        <form class="d-flex form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <input class="form-control mr-sm-4 m-2" type="search" placeholder="Search" aria-label="Search" value={values.keyword}  onChange={(e) => setValues({...values , keyword: e.target.value})} /> 
            <button class="btn btn-outline-success my-2 my-sm-0 p-2 "  type="submit">Search</button>
        </form>
    </>
  )
}

export default SearchInput