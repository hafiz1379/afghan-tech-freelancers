import React from 'react';

export default function Footer() {
  return (
    <div className="py-10 bg-gray-100 mt-auto">
      <p className="text-center leading-3 opacity-70">
        &copy; {new Date().getFullYear()} Afghan Tech Freelancers. All rights reserved.
      </p>
    </div>
  );
}
