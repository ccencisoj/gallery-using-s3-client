import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { 
      label, 
      type,
      icon: Icon, 
      flex, 
      color,
      primary,
      expand,
      secundary,
      darkBackground,
      ...events
    } = this.props;

    const styles_button = clsx({
      [styles.button]: true,
      [styles.button_icon]: Icon,
      [styles.button_flex]: flex,
      [styles.button_expand]: expand,
      [styles.button_primary]: primary,
      [styles.button_secundary]: secundary,
      [styles.button_darkbackground]: darkBackground,
    });

    return (
      <button type={type || "button"} 
        style={{color}} className={styles_button} {...events}>
        {Icon && <Icon className={styles.icon}/>} 
        {label && <p className={styles.label}>{label}</p>}
      </button>
    )
  }
}

export default Button;