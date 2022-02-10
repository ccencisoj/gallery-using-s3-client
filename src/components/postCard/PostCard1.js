import React from 'react';
import * as Icon from 'react-feather';
import getEndRect from 'utils/getEndRect';
import styles from './PostCard1.module.scss';
import MoreButton from 'components/MoreButton';
import { useModals } from 'hooks/ModalsContext';
import ViewerModal from 'components/modal/ViewerModal';
import ShareLinkModal from 'components/modal/ShareLinkModal';
import Selectable1 from 'components/selectable/Selectable1';
import SelectableCard1 from 'components/selectableCard/SelectableCard1';

class PostCard1 extends React.Component {
  constructor(props) {
    super(props);
    this.image = null;
  }

  imageRefCallback = (image)=> {
    this.image = image;
  }

  openViewer = ()=> {
    let { modals, collection, index } = this.props;
    let initialRect = this.image.getBoundingClientRect();
    let endRect = getEndRect(this.image);

    modals.show(ViewerModal, {
      collection, index, 
      initialSource: this.image.src, 
      initialRect, endRect});
  }

  share = ()=> {
    let { url: link } = this.props;

    this.props.modals.show(ShareLinkModal, {link});
  }

  render = ()=> {
    let { publisher, url, onLoadedItem } = this.props;
    let { profile } = publisher;

    return (
      <div className={styles.post_card}>
        <div className={styles.header}>
          <div className={styles.creator}>
            <img className={styles.image} 
              src={profile.image || "image/profile_avatar1.jpg"}/>
            <div className={styles.column}>
              <p className={styles.name}>{profile.username}</p>
              <p className={styles.userType}>MyGallery user</p>
            </div>
          </div>
          <div className={styles.actions}>
            <div className={styles.more_button}>
              <MoreButton icon={Icon.MoreHorizontal}>
                {({ hideSelectable })=> (
                  <Selectable1
                    onClick={()=> hideSelectable(100)}>
                    <SelectableCard1 
                      label="Compartir"
                      onClick={this.share}/>
                  </Selectable1>
                )}
              </MoreButton>
            </div>
          </div>
        </div>
        <div className={styles.main}>
          <img className={styles.image} src={url}
            onClick={this.openViewer}
            ref={this.imageRefCallback}/>
        </div>
      </div>
    )
  }
}

export default function(props) {
  const modals = useModals();

  return <PostCard1 {...props} 
    modals={modals}/>
}