import React from 'react';
import { Link } from 'react-router-dom';

type PageLinkProps = {
    text: string;
    to: string;
  }

function PageLink({ text, to } : PageLinkProps) {
  return (
    <Link to={to} >
      {text}
    </Link>
  );
}

export default PageLink;
