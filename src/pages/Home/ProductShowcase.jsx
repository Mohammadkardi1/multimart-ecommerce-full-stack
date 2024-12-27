import React from 'react';
import ProductsList from './../../components/UI/ProductsList';


const ProductShowcase = ({ title, products }) => {
  if (!products || products?.length === 0) return null

  return (
    <section className="pt-5">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="section__title mb-4">{title}</h2>
          </div>
          <ProductsList data={products} />
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;