import React from 'react';
import copy from 'copy-to-clipboard';
import * as Icon from 'react-feather';
import Button from 'components/button/Button';
import styles from './ShareLinkModal.module.scss';
import clsx from 'clsx';

class ShareLinkModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {copiedLink: false};
  }

  modalRefCallback = (modal)=> {
    if(!modal) return;

    modal.addEventListener("click", (ev)=> {
      if(ev.target.isEqualNode(modal))
      this.props.hideModal(300);
    });
  }

  render = ()=> {
    let { copiedLink } = this.state;
    let { hideModal, willHiddenModal, link } = this.props;

    let styles_share_link_modal = clsx({
      [styles.share_link_modal]: true,
      [styles.share_link_modal_hidden]: willHiddenModal
    });

    return (
      <div className={styles_share_link_modal}  
        ref={this.modalRefCallback}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.title}>Compartir enlace</p>
            <Button 
              icon={Icon.X} 
              onClick={()=> hideModal(300)}/>
          </div>
          <div className={styles.main}>
            <p className={styles.link}>{link}</p>
            <div className={styles.actions}>
              <Button 
                flex={true}
                primary={copiedLink ? true : false}
                secundary={!(copiedLink) ? true : false }
                label={copiedLink ? 
                "enlace copiado" : "copiar enlace"}
                onClick={()=> {
                  copy(link); 
                  this.setState({copiedLink: true})
                }}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShareLinkModal;