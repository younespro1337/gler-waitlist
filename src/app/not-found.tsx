'use client';
import * as React from 'react';

export default function NotFound() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ margin: 0, fontSize: 20 }}>Page not found</h1>
      <p style={{ marginTop: 8, color: '#666' }}>
        The page you are looking for does not exist.
      </p>
    </div>
  );
}

