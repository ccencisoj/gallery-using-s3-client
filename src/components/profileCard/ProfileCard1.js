import React from 'react';
import { connect } from 'react-redux';
import styles from './ProfileCard1.module.scss';
import { useResponsive } from 'hooks/ResponsiveContext';

const mapStateToProps = (store)=> ({
  profile: store.common.profile || {}
}); 

class ProfileCard1 extends React.Component {
  constructor(props) {
    super(props);
    this.skip = 0;
  }

  render = ()=> {
    let { profile, responsive } = this.props;
    let { isMobile } = responsive;

    return (
      <>{!(isMobile) && 
        <div className={styles.profile_card}>
          <img className={styles.image} 
            src={profile.image || "image/profile_avatar1.jpg"}/>
          <div className={styles.column}>
            <p className={styles.username}>@{profile.username}</p>
            {!isMobile && 
            <div className={styles.information}>              
              <div className={styles.container}>
                <p className={styles.label}>publicaciones</p>
                <p className={styles.value}>{profile.nposts}</p>
              </div>
            </div>}
          </div>
        </div>}
      {isMobile && 
      <div className={styles.profile_card_mobile}>
        <div className={styles.row}>
          <img className={styles.image} src="image/index_image2.jpg"/>
          <div className={styles.column}>
            <p className={styles.username}>@{profile.username}</p>  
          </div>  
        </div>
        <div className={styles.information}>
          <div className={styles.container}>
            <p className={styles.label}>publicaciones</p>
            <p className={styles.value}>{profile.nposts}</p>
          </div>
        </div>
      </div>}
      </>
    )
  }
}

export default connect(mapStateToProps, null)
(function(props) {
  const responsive = useResponsive();

  return <ProfileCard1 {...props} 
    responsive={responsive}/>
})