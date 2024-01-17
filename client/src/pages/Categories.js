import React from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();
  return (
    <Layout>
        <div className='container'>
            <div className='row'>
                {categories.map((c) => (
                    <div className='col-md-6 mt-5 mb-3 gx-3 gy-3' >
                        <button className='btn btn-primary text-light'>
                            <Link to={`/category/${c.slug}`} className='btn btn-primary'> {c.name} </Link>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </Layout>
  )
}

export default Categories