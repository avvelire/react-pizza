import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchPizza } from '../redux/slices/pizzaSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { RootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const { categoryId, sort, searchValue } = useSelector((state: RootState) => state.filter);
  const { items, status } = useSelector((state: RootState) => state.pizza);
  const dispatch = useAppDispatch();

  const getPizzas = async () => {
    const category = categoryId > 0 ? 'category=' + categoryId : '';
    const sortBy =
      sort.sortProperty === 'rating' ? sort.sortProperty + '&order=desc' : sort.sortProperty;
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizza({
        category,
        sortBy,
        search,
      }),
    );
    window.scroll(0, 0);
  };

  useEffect(() => {
    getPizzas();
    // eslint-disable-next-line
  }, [categoryId, sort.sortProperty, searchValue]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>An error has occurred 😕</h2>
          <p>Unfortunately, it was not possible to get pizzas. Please try again later.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
    </div>
  );
};

export default Home;
