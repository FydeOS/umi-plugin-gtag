import React from 'react';
import styles from './index.css';

import { IGetInitialProps } from 'umi';

const Home = props => <div className={styles.normal}>{props.data.title}</div>;
Home.getInitialProps = (async ctx => {
  const fakedRequest = function() {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        resolve(13579);
      }, 3000);
    });
  };
  const userId = await fakedRequest();
  return Promise.resolve({
    gtagData: {
      user_id: userId,
    },
    data: {
      title: 'Hello World, Hello Umi!',
    },
  });
}) as IGetInitialProps;
export default Home;
