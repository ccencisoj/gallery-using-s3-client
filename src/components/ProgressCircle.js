import React from 'react';
import { Circle } from 'rc-progress';
import styles from './ProgressCircle.module.scss';

class ProgressCircle extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    let { value } = this.props;

    return (
      <div className={styles.progress_circle}>
        <Circle 
          trailWidth="5" 
          trailColor="#e5e5ee" 
          percent={String(value*100)} 
          strokeWidth="10" 
          strokeColor="#125"/>
      </div>
    )
  }
}

export default ProgressCircle;