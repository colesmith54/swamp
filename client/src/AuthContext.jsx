import React, { createContext, useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

export const AuthContext = createContext(null);

function generateRandomLetters(length) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
}

export const AuthProvider = ({ children }) => {
  const username = useRef(null);
  const token = useRef(null);

  useEffect(() => {
    const uname = Cookie.get('username');
    const tok = Cookie.get('token');
    if (tok !== undefined) token.current = tok;
    if (uname !== undefined) username.current = uname;
    else username.current = generateRandomLetters(5)
  }, [])

  return (
    <AuthContext.Provider value={{ username, token }}>
      {children}
    </AuthContext.Provider>
  );
};
