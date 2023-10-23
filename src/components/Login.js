import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <button className='button' type='link' onClick={() => loginWithRedirect()}>
        Log In
      </button>
    )
  )
}

export default LoginButton