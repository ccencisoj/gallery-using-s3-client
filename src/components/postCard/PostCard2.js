import React from 'react';
import clsx from 'clsx';
import { isTempId } from 'utils/tempId';
import getEndRect from 'utils/getEndRect';
import styles from './PostCard2.module.scss';
import { useModals } from 'hooks/ModalsContext';
import ViewerModal from 'components/modal/ViewerModal';
import ProgressCircle from 'components/ProgressCircle';

class PostCard2 extends React.Component {
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

  render = ()=> {
    let { id, url, progress } = this.props;

    let styles_post_card = clsx({
      [styles.post_card]: true,
      [styles.post_card_uploading]: isTempId(id)
    });
    
    return (
      <div className={styles_post_card}>
        <img className={styles.image} 
          ref={this.imageRefCallback}
          src={url} onClick={this.openViewer}/>

        {progress && isTempId(id) &&
        <div className={styles.progress}>
          <ProgressCircle value={progress.uploaded}/>
        </div>}
      </div>
    )
  }
}

export default function(props) {
  const modals = useModals();

  return <PostCard2 {...props} 
    modals={modals}/>
}