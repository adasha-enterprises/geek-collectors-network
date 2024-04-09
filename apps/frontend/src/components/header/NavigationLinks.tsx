import React from 'react';

import { Flex } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

type NavigationLinksProps = {
    links: { path: string; text: string }[];
};

function NavigationLinks({ links }: NavigationLinksProps) {
  const location = useLocation();

  return (
    <Flex className="navigation-links">
      {links.map(({ path, text }) => (
        path === '/logout' ? (
          <Link
            key={path}
            to={'/'}
            className={`navigation-link ${location.pathname === path ? 'active' : ''}`}
            onClick={() => {
              fetch('/api/v1/user/logout', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
                .then(response => response.json())
                .then(() => {
                  window.location.href = '/';
                })
                .catch(error => console.error(error));
            }}
          >
            {text}
          </Link>
        ) : (
          <Link
            key={path}
            to={path}
            className={`navigation-link ${location.pathname === path ? 'active' : ''}`}
          >
            {text}
          </Link>
        )
      ))}
    </Flex>
  );
}

export default NavigationLinks;
