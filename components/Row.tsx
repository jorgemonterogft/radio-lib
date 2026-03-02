'use client';

import styles from '@components/Row.module.css';

import * as React from 'react';

/**
 * Row - Horizontal layout container
 * @description Flex container for horizontal element grouping, commonly used for navigation and button groups
 * @example <Row><Button>Option 1</Button><Button>Option 2</Button></Row>
 */
type RowProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

const Row = React.forwardRef<HTMLElement, RowProps>(({ children, ...rest }, ref) => {
  return (
    <section className={styles.row} ref={ref} {...rest}>
      {children}
    </section>
  );
});

Row.displayName = 'Row';

export default Row;
