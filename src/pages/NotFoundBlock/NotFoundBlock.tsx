import React from 'react';
import { Link } from 'react-router-dom';

import style from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={style.root}>
      <span>😕</span>
      <br />
      <h1>Page is not found</h1>
      <p className={style.description}>Unfortunately, nothing was found</p>
      <Link to="/">
        <button>return to the main page</button>
      </Link>
    </div>
  );
};

export default NotFoundBlock;
