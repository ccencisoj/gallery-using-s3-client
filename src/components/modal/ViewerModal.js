import React, { Fragment } from 'react';
import clsx from 'clsx';
import * as Icon from 'react-feather';
import getEndRect from 'utils/getEndRect';
import styles from './ViewerModal.module.scss';
import Button from 'components/button/Button';
import { useModals } from 'hooks/ModalsContext';
import { useResponsive } from 'hooks/ResponsiveContext';
import ShareLinkModal from 'components/modal/ShareLinkModal';

class ViewerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      collection: props.collection,
      initialRect: props.responsive.isDesktop ? 
      props.initialRect : props.endRect,
      endRect: props.endRect,
      currentSource: props.initialSource,
    };
  }

  previewSource = ()=> {
    let { collection, index } = this.state;

    if((index - 1) < 0) return;

    let newIndex = index - 1;
    let currentSource = collection[newIndex].url;
    let image = new Image();

    image.addEventListener("load", (ev)=> {
      let endRect = getEndRect(image);
      let initialRect = endRect;

      this.setState({ 
        index: newIndex, currentSource, 
        initialRect, endRect });
    });
    
    image.src = currentSource;
  }

  nextSource = ()=> {
    let { collection, index } = this.state;

    if((index + 1) >= collection.length) return;

    let newIndex = index + 1;
    let currentSource = collection[newIndex].url;
    let image = new Image();

    image.addEventListener("load", (ev)=> {
      let endRect = getEndRect(image);
      let initialRect = endRect;

      this.setState({ 
        index: newIndex, currentSource, 
        initialRect, endRect });
    });
    
    image.src = currentSource;
  }

  modalRefCallback = (modal)=> {
    if(!modal) return;

    modal.addEventListener("click", (ev)=> {
      if(ev.target.isEqualNode(modal)) 
      this.props.hideModal(300);
    });
  }

  share = ()=> {
    let { currentSource } = this.state;

    this.props.modals.show(
      ShareLinkModal, 
      {link: currentSource});
  }

  render = ()=> {
    let { willHiddenModal, responsive } = this.props;
    let { currentSource, initialRect, endRect } = this.state;

    let { isMobile, isTablet } = responsive;
    
    let styles_viewer_modal = clsx({
      [styles.viewer_modal]: true,
      [styles.viewer_modal_hidden]: willHiddenModal
    });

    return (
      <div className={styles_viewer_modal} 
        ref={this.modalRefCallback}>

        {!(isMobile || isTablet) && 
        <Fragment>
          <button className={styles.arrow_left} 
            onClick={this.previewSource}>
            <Icon.ChevronLeft className={styles.icon}/>
          </button>
          <button className={styles.arrow_right}
            onClick={this.nextSource}>
            <Icon.ChevronRight className={styles.icon}/>
          </button>
        </Fragment>}

        <div className={styles.navigation}>
          <div className={styles.gradient}></div>
          <div className={styles.left}></div>
          <div className={styles.right}>
            <a href={currentSource + "?attachment=true"} 
              download={currentSource.split("/").pop()}>
              <Button 
                icon={Icon.Download}
                darkBackground={true}/>
            </a>
            <Button
              icon={Icon.Share2}
              darkBackground={true}
              onClick={this.share}/>
          </div>
        </div>

        <img className={styles.image} 
          src={currentSource} 
          style={{
            "--initial-top": `${initialRect.top}px`,
            "--initial-left": `${initialRect.left}px`,
            "--initial-width": `${initialRect.width}px`,
            "--initial-height": `${initialRect.height}px`,
            "--end-top": `${endRect.top}px`,
            "--end-left": `${endRect.left}px`,
            "--end-width": `${endRect.width}px`,
            "--end-height": `${endRect.height}px`
          }}/>      
      </div>
    )
  }
}

export default function(props) {
  const modals = useModals();
  const responsive = useResponsive();

  return <ViewerModal {...props} 
    modals={modals}
    responsive={responsive}/>
}