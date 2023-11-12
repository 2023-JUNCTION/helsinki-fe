import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

type Props = {
  fullWidth?: boolean;
  labelText?: string;
  isBlack?: boolean;
  isWhite?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, type = 'button', isBlack = false, labelText = '', className, ...restProps }: Props) => {
  return (
    <button
      {...restProps}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={cn(className, styles.container, isBlack && styles.black)}
    >
      <span>{labelText ? <>{labelText}</> : children}</span>
    </button>
  );
};

export default Button;
