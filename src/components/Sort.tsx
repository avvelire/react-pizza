import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType, SortPropertyEnum } from '../redux/slices/filterSlice';
import { RootState,  } from '../redux/store';

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
}

const Sort: React.FC = React.memo(() => {
  const sort = useSelector((state: RootState) => state.filter.sort);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const sortArr: SortItem[] = [
    { name: 'popularity (DESC)', sortProperty: SortPropertyEnum.RATING },
    { name: 'price', sortProperty: SortPropertyEnum.PRICE },
    { name: 'alphabet', sortProperty: SortPropertyEnum.TITLE },
  ];

  const changeSort = (obj: SortItem) => {
    dispatch(setSortType(obj));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current){
        let path = event.composedPath().includes(sortRef.current);
        if (!path) setIsOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sort.name}</span>
      </div>
      <div className="sort__popup">
        <ul>
          {isOpen &&
            sortArr.map((obj, i) => (
              <li
                key={i}
                onClick={() => changeSort(obj)}
                className={obj.name === sort.name ? 'active' : ''}
              >
                {obj.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
})

export default Sort;
