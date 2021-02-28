import React, { FC } from 'react';
import { FOOTER_COPYRIGHT } from '@/constants/constants';
import { setInnerHtml } from '@/utils/utils';

const Footer: FC = () => {
  return (
    <footer
      dangerouslySetInnerHTML={setInnerHtml(FOOTER_COPYRIGHT.developer + FOOTER_COPYRIGHT.rsLogo)}
    ></footer>
  );
};

export default Footer;
