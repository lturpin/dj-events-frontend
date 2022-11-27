import Link from 'next/link';
import { GoAlert } from 'react-icons/go'
import Layout from '@/components/Layout';
import styles from '@/styles/404.module.css';

function NotFoundPage() {
  return (
    <Layout>
      <div className={styles.error}>
        <h1>
          <GoAlert />{' '}404
        </h1>
        <h4>Sorry, this is nothing here</h4>
        <Link href='/'>Go Back Home</Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage;