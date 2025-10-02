/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  
  export const frontmatter: {
    title: string;
    slug: string;
    domain: string;
    level: string;
    timeToRead: string;
    tags: string[];
    summary: string;
    updated: string;
    sources?: { title: string; url: string }[];
  };
  
  const component: ComponentType;
  export default component;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
      },
      HTMLElement
    >;
  }
}
