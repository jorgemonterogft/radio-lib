import styles from '@components/AlertBanner.module.css';

import * as React from 'react';

/**
 * AlertBanner - Display status messages and notifications
 * @description Shows error messages, success notifications, warnings, and informational alerts
 * @example <AlertBanner>Login failed. Please try again.</AlertBanner>
 */
interface AlertBannerProps {
  style?: any;
  children?: any;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ style: propStyle, ...rest }) => {
  let style: React.CSSProperties = { ...propStyle };

  return <div className={styles.root} {...rest} style={style} />;
};

export default AlertBanner;
