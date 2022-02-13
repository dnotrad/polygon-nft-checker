import { FC } from 'react';
import cn from 'classnames';

import s from './style.module.scss';

interface IProps {
  onClick: () => void;
  className?: string;
  center?: boolean;
}

const Button: FC<IProps> = ({ children, onClick, className, center }) => {
  const buttonMarkup = (
    <button className={cn(s.button, className)} onClick={onClick} type="button">
      {children}
    </button>
  );

  if (center) return <div className={s.center}>{buttonMarkup}</div>;
  return buttonMarkup;
};

export default Button;
