import React from 'react';

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m6.5 2.5-1-2-1 2-2 1 2 1 1 2 1-2 2-1z" />
    <path d="m18.5 2.5-1-2-1 2-2 1 2 1 1 2 1-2 2-1z" />
    <path d="m12.5 12.5-1-2-1 2-2 1 2 1 1 2 1-2 2-1z" />
  </svg>
);
