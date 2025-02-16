"use client";

import { useEffect } from 'react';
import { useAuth } from '@/Context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg h-screen p-4">
        <nav className="space-y-4">
        <a href="/dashboard"  className="text-xl font-bold mb-4 cursor-pointer" >Admin Panel</a>
          <ul className="space-y-2">
            <li><a href="/maqolalar" className="block py-2 px-4 rounded hover:bg-gray-200">Malumotlar bazasi</a></li>
            <li>
              <button
                onClick={logout}
                className="w-full text-left py-2 px-4 rounded text-white bg-red-600 hover:bg-red-700 mt-4"
              >
                Chiqish
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}