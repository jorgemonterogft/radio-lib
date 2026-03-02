import styles from '@components/Divider.module.css';

import * as React from 'react';

/**
 * Divider - Visual separator between content sections
 * @description Horizontal line element for separating distinct content areas
 * @example <Divider />
 */
interface DividerProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  type?: string | any;
  style?: any;
}

const Divider: React.FC<DividerProps> = ({ children, style, type }) => {
  if (type === 'GRADIENT') {
    return <div className={styles.gradient} style={style} />;
  }

  if (type === 'DOUBLE') {
    return (
      <div className={styles.divider} style={style}>
        <div className={styles.line} style={{ marginBottom: `2px` }} />
        <div className={styles.line} />
      </div>
    );
  }

  return (
    <div className={styles.divider} style={style}>
      <div className={styles.line} />
    </div>
  );
};

export default Divider;
