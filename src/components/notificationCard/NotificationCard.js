import React from 'react';
import clsx from 'clsx';
import styles from './NotificationCard.module.scss';
import { useResponsive } from 'hooks/ResponsiveContext';

class NotificationCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    let { notifier, value, date, seen, responsive } = this.props;
    let { isMobile } = responsive;

    const styles_notification_card = clsx({
      [styles.notification_card]: true,
      [styles.notification_card_mobile]: isMobile
    });

    return (
      <div className={styles_notification_card}>
        <div className={styles.container}>
          <img className={styles.image} 
            src={notifier.image || "image/profile_avatar1.jpg"}/>
          <div className={styles.column}>
            <p className={styles.value}>{value}</p>
            <p className={styles.date}>{date}</p>
          </div>
        </div>
        {!(seen) && <span className={styles.ball}></span>}
      </div>
    )
  }
}

export default function(props) {
  const responsive = useResponsive();

  return <NotificationCard {...props} 
    responsive={responsive}/>;
}