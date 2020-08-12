import React from 'react';
import styles from './index.css';

window.userId = 6666;

window.addEventListener('load', function() {
  console.log('load 111');
});
window.onload = function() {
  console.log('onload');
};
window.addEventListener('load', function() {
  console.log('load 222');
});
window.onload = function() {
  console.log('onload222');
};
console.log('umi js');
export default () => <div className={styles.normal}>Hello Umi!</div>;
