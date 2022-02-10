import React from 'react';
import styles from './SelectableCard1.module.scss';

class SelectableCard1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    let { label, onClick } = this.props;

    return (
      <div className={styles.selectable_card} onClick={onClick}>
        <p className={styles.label}>{label}</p>
      </div>
    )
  }
}

export default SelectableCard1;