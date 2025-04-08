'use client'; // If using App Router

import { useEffect } from 'react';

type InstagramEmbedProps = {
  postUrl: string;
};

export const InstagramImage = ({ postUrl }: InstagramEmbedProps) => {
  useEffect(() => {
    // Load the Instagram embed script after mount
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up
      document.body.removeChild(script);
    };
  }, []);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={postUrl}
      data-instgrm-version="14"
      style={{ margin: 'auto', maxWidth: '540px' }}
    ></blockquote>
  );
};