import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export const HamburgerIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const PlayIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

export const TicketIcon: React.FC<IconProps> = ({ size = 24, className }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l-4 4l-1.5-1.5M15 11l4 4l1.5-1.5M9 11h6M2 9v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
        <path d="M2.5 7.5V5a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v2.5"/>
    </svg>
);

export const FacebookIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export const TwitterIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 2.8 3.2 2.8 5.4 0 3.8-3.1 7.3-7.5 7.3-2.1 0-4-1.2-5.4-2.1.6 0 1.2.1 1.8.1 1.7 0 3.3-.6 4.6-1.6-.8 0-1.5-.2-2.1-.6-.5-.4-.9-.9-1.2-1.5.2 0 .5.1.7.1.3 0 .6 0 .9-.1-.8-.2-1.5-.7-2-1.4-.4-.8-.6-1.6-.6-2.5.5.3 1 .4 1.5.4-.9-.6-1.5-1.6-1.5-2.8 0-.6.2-1.2.4-1.7 1 1.2 2.4 2.1 4.1 2.8.5.8.8 1.6.8 2.5 0 1.5-1.2 2.7-2.7 2.7-.8 0-1.5-.4-2-1 .3 2.1 1.7 3.5 3.5 4.3.4.2.8.3 1.3.3 1.7 0 3.1-1.4 3.1-3.1 0-.1 0-.2 0-.3.8-.6 1.4-1.3 2-2.1z"></path>
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const YoutubeIcon: React.FC<IconProps> = ({ size = 24, className }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10C2.5 4.63 6.63 2.5 12 2.5s9.5 2.13 9.5 4.5a24.12 24.12 0 0 1 0 10c0 2.37-4.13 4.5-9.5 4.5s-9.5-2.13-9.5-4.5Z" />
        <path d="m10 15 5-3-5-3z" />
    </svg>
);

export const EditIcon: React.FC<IconProps> = ({ size = 24, className }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
        <path d="m15 5 4 4"/>
    </svg>
);

export const SunIcon: React.FC<IconProps> = ({ size = 24, className }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ size = 24, className }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
);