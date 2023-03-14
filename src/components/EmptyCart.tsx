import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/img/empty-cart.png';

const EmptyCart: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Cart is Empty <span>😕</span>
        </h2>
        <p>
          You probably haven't ordered pizza yet.
          <br />
          To order pizza, go to the main page.
        </p>
        <img src={img} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>return to the main page</span>
        </Link>
      </div>
    </>
  );
};

export default EmptyCart;
