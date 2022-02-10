import React from 'react';
import * as Icon from 'react-feather';
import Toggle from 'components/Toggle';
import styles from './Field.module.scss';

class Field extends React.Component {
  constructor(props) {
    super(props);
  }  
  
  render = ()=> {
    let { 
      placeholder, 
      value, 
      name, 
      showActions, 
      error,
      showError,
      onBlur, onChange 
    } = this.props;

    return (
      <div className={styles.field}>
        <input type='text' 
          value={value}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          className={styles.input} 
          placeholder={placeholder}/>
        {showError && <span className={styles.error}>{error}</span>}
        {showActions && 
        <div className={styles.actions}>
          <Toggle items={(turnToggle)=> [
          <button className={styles.action} onClick={turnToggle}>
            <Icon.EyeOff className={styles.icon}/>
          </button>, 
          <button className={styles.actived_action} onClick={turnToggle}>
            <Icon.Eye className={styles.icon}/>
          </button>]}/>
        </div>}
      </div>
    )
  }
}

export default Field;