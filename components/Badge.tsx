'use client';

import styles from '@components/Badge.module.css';

import * as React from 'react';

/**
 * Badge - Display tags, labels, and categories
 * @description Article tags, topic labels, status indicators, content categorization
 * @example <Badge>#technology</Badge>
 */
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ children, ...rest }) => {
  return (
    <span className={styles.root} {...rest}>
      {children}
    </span>
  );
};

export default Badge;
