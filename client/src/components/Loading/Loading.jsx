import React from 'react';
import { Bars } from 'react-loader-spinner';

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Bars />
    </div>
  );
}
