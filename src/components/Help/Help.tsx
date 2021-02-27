import React, { FC, useState, useEffect } from 'react';
import './styles.scss';
import { HELP_INFO } from '@/constants/text';

const Help: FC = () => {
  return (
    <div className="help_about">{HELP_INFO.text}</div>);
};

export default Help;
