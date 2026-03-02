import styles from '@components/Indent.module.css';

import * as React from 'react';

/**
 * Indent - Content spacing and indentation wrapper
 * @description Adds left padding/margin to nest content, used for hierarchical layouts
 * @example <Indent><Text>Indented content</Text></Indent>
 */
interface IndentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Indent: React.FC<IndentProps> = ({ children, ...rest }) => {
  return (
    <div className={styles.root} {...rest}>
      {children}
    </div>
  );
};

export default Indent;
