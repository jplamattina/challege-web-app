import styles from "./page.module.css";
import Link from 'next/link';

const App = () => {
  return (
    <div className={styles.page}>
      <div>
        <h1>Challenge Eldar Aplication</h1>
        <Link className='link-login' href="/login">Login</Link>
    </div>
    </div>
  );
}

export default App