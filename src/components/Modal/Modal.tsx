import './styles.scss';
import React, { FC, useCallback } from 'react';
import { ModalProps } from './Modal.model';
import { ButtonProps } from '@components/Button/Button.model';
import { ButtonContainer } from '@/containers/Button.container';
import { BUTTON_OK } from '@/constants/text';

export const showModal = () => {
  const modalWindow = document.getElementById('modalWindow');
  modalWindow?.classList.add('show');
  modalWindow?.classList.add('modal-dialog-centered');
};

export const hideModal = () => {
  const modalWindow = document.getElementById('modalWindow');
  modalWindow?.classList.remove('show');
  modalWindow?.classList.remove('modal-dialog-centered');
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
          return (
            <ButtonContainer
              key={item.name}
              id={item.id}
              name={item.name}
              handleClick={item.handleClick}
            />
          );
        }
      );
    }
    return [
      <ButtonContainer
        key={BUTTON_OK.id}
        id={BUTTON_OK.id}
        name={BUTTON_OK.name}
        handleClick={handleClose}
      />,
    ];
  }, [buttons]);

  return isEmpty ? (
    <div id="modalWindow" className="modal fade "></div>
  ) : (
    <div id="modalWindow" className="modal fade ">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <h2 className="card-header text-info">{header}</h2>
          {body && <div className="modal-body">{body}</div>}
          <div className="modal-footer">{buttonItems()}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
