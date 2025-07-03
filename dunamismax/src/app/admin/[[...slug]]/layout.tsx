'use client';

import React from 'react';
import { RootLayout } from 'payload/components/root';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <RootLayout>{children}</RootLayout>;
};

export default Layout;
