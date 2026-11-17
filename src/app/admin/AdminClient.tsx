'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminDashboard } from '../../components/AdminDashboard';
import { AdminShellSkeleton } from '../../components/AdminSkeleton';
import { useNavigation } from '../../context/NavigationContext';
import { useAppDispatch, useAppSelector } from '../../store';
import { checkAuthThunk } from '../../store/slices/authSlice';

export function AdminClient() {
  const { navigate } = useNavigation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthThunk())
      .unwrap()
      .catch(() => {
        if (typeof window !== 'undefined' && !localStorage.getItem('axoora_auth_session')) {
          router.replace('/admin/login');
        }
      });
  }, [dispatch, router]);

  const checking = (status === 'loading' || status === 'idle') && !isAuthenticated;

  if (checking) {
    return <AdminShellSkeleton />;
  }

  if (!isAuthenticated) return null;

  return <AdminDashboard onExitAdmin={() => navigate('business')} />;
}
