import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import data from '../../util/data';
import Link from 'next/link';
import Image from 'next/image';
import { Store } from '../../util/store';

const ProductScreen = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Product not found</div>;
  }
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      alert('sorry.product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">bakc to home page</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h2 className="text-lg">{product.name}</h2>
            </li>
            <li>category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>status</div>
              <div>{product.countInStock > 0 ? 'In stock' : 'Unavailble'}</div>
            </div>
            <button
              onClick={addToCartHandler}
              className="primary-button w-full"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductScreen;
