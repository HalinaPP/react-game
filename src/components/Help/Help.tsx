import React, { FC, useState, useEffect } from 'react';
import './styles.scss';
import { HELP_INFO } from '@/constants/text';

const Help: FC = () => {
  return (
    <div className="help_about">
      <p>{HELP_INFO.text}</p>
      <div className="help_hot-keys">
        <span className="text-info">{HELP_INFO.headerHotKeys}:</span>
        {HELP_INFO.hotKeys.map(key => (
          <div key={key[0]}>
            <b className="text-info">{key[0]} - </b> {key[1]}{' '}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;
