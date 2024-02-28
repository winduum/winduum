import './globals.css';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="bg-dark text-light">
      <head>
        <title>Next.js Turbopack App Winduum</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
