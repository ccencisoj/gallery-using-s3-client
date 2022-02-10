import React from 'react';
import styles from './Selectable1.module.scss';

class Selectable extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    let { children, onClick } = this.props;

    return (
      <div className={styles.selectable} 
        onClick={onClick}>
        {children}
      </div>
    )
  }
}

export default Selectable;