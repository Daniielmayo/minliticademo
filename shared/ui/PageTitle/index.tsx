import React from 'react';

export interface PageTitleProps {
  title: string;
  subtitle?: string;
  level?: 1 | 2 | 3;
  actions?: React.ReactNode;
  className?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subtitle,
  level = 1,
  actions,
  className = '',
}) => {
  const renderTitle = () => {
    switch (level) {
      case 1:
        return (
          <h1 className="text-[28px] leading-[34px] font-bold text-brand-primary tracking-tight">
            {title}
          </h1>
        );
      case 2:
        return (
          <h2 className="text-[20px] leading-[26px] font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
        );
      case 3:
        return (
          <h3 className="text-[17px] leading-[24px] font-semibold text-slate-900">
            {title}
          </h3>
        );
      default:
        return (
          <h1 className="text-[28px] leading-[34px] font-bold text-brand-primary tracking-tight">
            {title}
          </h1>
        );
    }
  };

  return (
    <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${className}`}>
      <div>
        {renderTitle()}
        {subtitle && (
          <p className="text-[14px] text-slate-500 mt-1 leading-relaxed font-normal">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
};

export default PageTitle;
