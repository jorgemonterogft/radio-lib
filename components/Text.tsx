import styles from '@components/Text.module.css';

import * as React from 'react';

/**
 * Text - Basic paragraph text element
 * @description Primary text component for displaying content, uses monospaced terminal font
 * @example <Text>This is a paragraph</Text>
 */
interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <p className={styles.text} {...rest}>
      {children}
    </p>
  );
};

export default Text;
