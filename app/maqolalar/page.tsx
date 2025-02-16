"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";
import { API } from "@/hooks/getEnv";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  maqola: string; // Fayl URL
  createdAt: string;
}

export default function MaqolalarPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!!isAuthenticated) {
      router.push("/login");
    } else {
      fetchUsers();
    }
  }, [isAuthenticated]);

  // API dan foydalanuvchilarni olish
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API}/users`);
      if (!res.ok) throw new Error("Foydalanuvchilarni olishda xatolik yuz berdi!");
      const data: User[] = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noma'lum xatolik!");
    } finally {
      setLoading(false);
    }
  };

  // Faylni yuklab olish funksiyasi
  const downloadArticle = (maqola: string, firstName: string) => {
    if (!maqola) {
      alert("Fayl topilmadi!");
      return;
    }
    const url = `${API}/uploads/${maqola}`;
    const a = document.createElement("a");
    a.href = url;
    a.download = maqola.split("/").pop() || `${firstName}_maqola`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg h-screen p-4">
        <nav className="space-y-4">
          <a href="/dashboard" className="text-xl font-bold mb-4 cursor-pointer">Admin Panel</a>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => router.push("/login")}
                className="w-full text-left py-2 px-4 rounded text-white bg-red-600 hover:bg-red-700 mt-4"
              >
                Chiqish
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Foydalanuvchilar Ro'yxati</h1>

        {loading ? (
          <p className="text-gray-600">Yuklanmoqda...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Ism</th>
                  <th className="py-3 px-4 text-left">Familiya</th>
                  <th className="py-3 px-4 text-left">Telefon</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Yaratilgan sana</th>
                  <th className="py-3 px-4 text-center">Maqola</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4">{user.id}</td>
                    <td className="py-3 px-4">{user.first_name}</td>
                    <td className="py-3 px-4">{user.last_name}</td>
                    <td className="py-3 px-4">{user.phone_number}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-center">
                      {user.maqola ? (
                        <button
                          onClick={() => downloadArticle(user.maqola, user.first_name)}
                          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                        >
                          Yuklab olish 📥
                        </button>
                      ) : (
                        <span className="text-gray-500">Fayl yo‘q</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
