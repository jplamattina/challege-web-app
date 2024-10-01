import styles from "./page.module.css";
import Link from 'next/link';

const App = () => {
  return (
    <div className={styles.page}>
      <div>
        <h1>Bienvenido a la Aplicación</h1>
        <Link href="/login">Login</Link>
    </div>
    </div>
  );
}

export default App