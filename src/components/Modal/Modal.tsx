import React, { FC, useCallback } from 'react';
import { ModalProps } from './Modal.model';
import { ButtonProps } from '@components/Button/Button.model';
import Button from '@components/Button';
import Menu from '@components/Menu';
import './styles.scss';
import { BUTTON_OK } from '@/constants/text';

export const showModal = () => {
  const modalWindow = document.getElementById('modalWindow');
  modalWindow?.classList.add('show');
  modalWindow?.classList.add('modal-dialog-centered');
};

const Modal: FC<ModalProps> = ({ isEmpty, header, body, buttons = [], onSetShowModalSetting }) => {
  const handleClose = useCallback(() => {
    const modalWindow = document.getElementById('modalWindow');
    modalWindow?.classList.remove('show');
    modalWindow?.classList.remove('modal-dialog-centered');
    onSetShowModalSetting(true, '', <React.Fragment></React.Fragment>, []);
  }, []);

  const buttonItems = useCallback((): Array<JSX.Element> => {
    if (buttons.length > 0) {
      return buttons.map(
        (item: ButtonProps): JSX.Element => {
          console.log('item', item);
          return <Button name={item.name} handleClick={item.handleClick} />;
        }
      );
    }
    return [<Button name={BUTTON_OK} handleClick={handleClose} />];
  }, []);
  return isEmpty ? (
    <div id="modalWindow" className="modal fade "></div>
  ) : (
    <div id="modalWindow" className="modal fade ">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <h2 className="card-header">{header}</h2>
          {body && <div className="modal-body">{body}</div>}
          <div className="modal-footer">{buttonItems()}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
