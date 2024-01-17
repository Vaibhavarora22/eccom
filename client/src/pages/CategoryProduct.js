import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const CategoryProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [products , setProducts] = useState([]);
    const [category , setCategory] = useState([]);

    useEffect(() => {
        if (params?.slug) getPrductsByCat();
    }, [params?.slug]);

    const getPrductsByCat = async () => {
        try {
          const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-category/${params.slug}`);
          setProducts(data?.products);
          setCategory(data?.category);
        } 
        catch (error) {
          console.log(error);
        }
      };
  return (
    <Layout>
        <div>
            <div className='container mt-3'>
                
                <h4 className='text-center'> {category?.name}</h4>
                <h5 className='text-center'> {products?.length} result found</h5>
                <div className='row'>
                    <div className="col-md-9 offset-1">
          
                        
                        <div className="d-flex flex-wrap">
                            {products?.map ((p) => (
                            <div className="card m-2" style={{width: '18rem'}}>
                                <img className="card-img-top" src= {`http://localhost:8080/api/v1/product/product-photo/${p._id}`}  alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0 , 30)}...</p>
                                    <p className="card-text">$ {p.price}</p>
                                    <button className="btn btn-primary ms-1" onClick={() => {
                                    navigate(`/product/${p.slug}`)

                                    }}> More Details</button>
                                    <button className="btn btn-secondary ms-1"> ADD TO CART</button>
                                                    
                                </div>
                            </div>
                                        
                                    
                            ))};
                        </div> 
                        {/* <div className="m-2 p-3">
                            {products && products.length <total && (
                            <button className="btn btn-warning" onClick={(e) => {
                                e.preventDefault();
                                setPage(page + 1);
                            }}>
                                {loading ? "Loading ... " : "Loadmore"}
                            </button>
                            )}
                        </div>   */}
                    </div>
                </div>
            </div>
        </div>

    </Layout>
    
  )
}

export default CategoryProduct