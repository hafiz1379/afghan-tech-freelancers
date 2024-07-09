import React from 'react';
import { Bars } from 'react-loader-spinner';

export function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Bars />
    </div>
  );
}

export function Label({ children, required, htmlFor }) {
  return (
    <label htmlFor={htmlFor}>
      {children} <span className="text-red-500">{required && '*'}</span>
    </label>
  );
}
