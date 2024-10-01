'use client'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Admin from '@/components/adminScreen';
import { RootState } from '../redux/store';

const AdminPage = () => {
  const user = useSelector((state: RootState) => state.auth.userRole);
  const router = useRouter();
  console.log('user::>?', user);

  useEffect(() => {
    if (user !== 'admin') {
      router.push('/login');
    } else {
      router.push('/admin');
    }
  }, [user, router]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Admin />
    </div>
  );
};

export default AdminPage;