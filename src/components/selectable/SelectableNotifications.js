import React from 'react';
import clsx from 'clsx';
import * as Icon from 'react-feather';
import Button from 'components/button/Button';
import { useResponsive } from 'hooks/ResponsiveContext';
import styles from './SelectableNotifications.module.scss';
import NotificationCard from 'components/notificationCard/NotificationCard';

class SelectableNotifications extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    let { responsive, hideSelectable } = this.props;
    let { isMobile } = responsive;

    const styles_selectable_notifications = clsx({
      [styles.selectable_notifications]: true,
      [styles.selectable_notifications_mobile]: isMobile
    });
    
    return (
      <div className={styles_selectable_notifications}>
        <div className={styles.header}>
          <p className={styles.title}>Notificaciones</p>
          <Button icon={Icon.X} onClick={hideSelectable}/>
        </div>
        <div className={styles.main}>
          {[].map((notification, index)=> {
            return <NotificationCard key={index} {...notification}/>
          })}
        </div>
      </div>
    )
  }
}

export default function(props) {
  const responsive = useResponsive();

  const notifications = [
    {
      seen: true,
      image: "image/index_image1.jpg",
      value: "@Raul ha actualizado su foto de perfil",
      date: "hace 1 hora"
    },
    {
      seen: true,
      image: "image/index_image1.jpg",
      value: "@Raul ha actualizado su foto de perfil",
      date: "hace 1 hora"
    },
    {
      seen: false,
      image: "image/index_image1.jpg",
      value: "@Raul ha actualizado su foto de perfil",
      date: "hace 1 hora"
    }
  ];

  return <SelectableNotifications 
    {...props}
    responsive={responsive}
    notifications={notifications}/>
}