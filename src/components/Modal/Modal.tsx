import React, { FC } from 'react';
import { ModalProps } from './Modal.model';
import { ButtonProps } from '@components/Button/Button.model';
import Button from '@components/Button';
import Menu from '@components/Menu';

export const showModal = () => {
  const modalWindow = document.getElementById('modalWindow');
  modalWindow?.classList.add('show');
};

const Modal: FC<ModalProps> = ({ header, body, buttons = [] }) => {
  const buttonItems = (): Array<JSX.Element> => {
    return buttons.map(
      (item: ButtonProps): JSX.Element => {
        console.log('item', item);
        return <Button name={item.name} handleClick={item.handleClick} />;
      }
    );
  };

  const handleClose = () => {
    const modalWindow = document.getElementById('modalWindow');
    modalWindow?.classList.remove('show');
  };

  /*<Button name="close" btnClassName="close" data-dismiss="modal" handleClick={handleClose}>
                <span aria-hidden="true">&times;</span>
              </Button>*/
  return (
    <div id="modalWindow" className="modal fade modal-dialog-centered">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {body && (
            <div className="modal-body">
              <p>{body}</p>
            </div>
          )}
          <div className="modal-footer">{buttonItems()}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
