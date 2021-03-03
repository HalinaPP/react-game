import React, { FC , useContext} from 'react';
import { FOOTER_COPYRIGHT } from '@/constants/constants';
import { setInnerHtml } from '@/utils/utils';

const Footer: FC<{theme:any}> = ({theme}) => {

  return (
    <footer style={{ background: theme.background, color: theme.foreground }} 
      dangerouslySetInnerHTML={setInnerHtml(FOOTER_COPYRIGHT.developer + FOOTER_COPYRIGHT.rsLogo)}
    ></footer>
  );
};

export default Footer;
