// components/ProtectedRoute.tsx
'use client';

import { useAuth } from '@/app/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ 
  children, 
  requiredRole = null 
}: { 
  children: React.ReactNode;
  requiredRole?: string | null;
}) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }

    // Role-based authorization check
    if (!isLoading && isAuthenticated && requiredRole) {
      if (user.userRole !== requiredRole) {
        router.push('/unauthorized');
      }
    }
  }, [isLoading, isAuthenticated, user, router, requiredRole]);

  // Show loading state while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If authenticated and has required role (or no role required), render children
  if (isAuthenticated && (!requiredRole || user.userRole === requiredRole)) {
    return <>{children}</>;
  }

  // Don't render anything while redirecting
  return null;
}
