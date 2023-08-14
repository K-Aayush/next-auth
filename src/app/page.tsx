'use client'

import React, { useState, useEffect } from 'react'; 
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  description: string;
  images: string[];
}


export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data); 
        console.log('Data type:', typeof data);
        setProducts(data.products); 
      }) 
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <main className="">
      <div className=''>
        {products.map(product => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <Image
              src={product.images[0]} 
              alt={product.title}
              width={400}
              height={400}
            />
          </div>
        ))}
      </div>
    </main>
  );
}