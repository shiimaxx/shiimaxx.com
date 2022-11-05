import styles from './layout.module.css';

export default function Layout({ children }: {children: any}) {
  return <div className={styles.container}>{children}</div>;
}
