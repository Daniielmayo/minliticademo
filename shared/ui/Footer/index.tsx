import React from 'react';

export interface FooterProps {
  className?: string;
  copyrightText?: string;
}

export const Footer: React.FC<FooterProps> = ({
  className = '',
  copyrightText = 'Inteligencia de precisión para operaciones mineras. © 2025 Minlítica - Enerlítica SAS.',
}) => {
  return (
    <footer className={`w-full py-4 px-6 bg-navy-dark-translucent text-white text-center text-xs tracking-wide border-t border-white/10 ${className}`}>
      <p>{copyrightText}</p>
    </footer>
  );
};

export default Footer;
