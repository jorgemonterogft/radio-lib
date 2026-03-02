'use client';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          Built with{' '}
          <a href="https://github.com/internet-development/sacred" target="_blank" rel="noopener noreferrer" className={styles.link}>
            Sacred Design System
          </a>
          {' '}— A terminal-inspired React component library
        </p>
      </div>
    </footer>
  );
}
