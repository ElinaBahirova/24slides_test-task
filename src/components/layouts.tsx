import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface Props {
  className?: string;
  children: ReactNode;
}

export const CenteredLayout: FC<Props> = ({
  className,
  children,
}) => (
  <div
    className={clsx(
      'flex flex-col items-center justify-center pb-32 text-slate-700 h-[calc(100vh-48px)]',
      className,
    )}
  >
    {children}
  </div>
);
