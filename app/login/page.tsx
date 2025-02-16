"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

const STATIC_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "";
const STATIC_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "";

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    
    console.log(formData.email)
    console.log(STATIC_EMAIL)
    if (formData.email == STATIC_EMAIL && formData.password == STATIC_PASSWORD) {
      localStorage.setItem("adminAuth", "true")
      toast.success("Muvaffaqiyatli tizimga kirdingiz!", { position: "top-center" })
      router.push("/maqolalar")
    } else {
      toast.error("Noto‘g‘ri email yoki parol", { position: "top-center" })
      setError("Noto‘g‘ri email yoki parol")
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-xl">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-800">Admin Panel</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Boshqaruv paneliga xush kelibsiz</p>
        </div>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">{error}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                disabled={isLoading}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Parol</label>
              <input
                type="password"
                required
                disabled={isLoading}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isLoading ? "Kirish..." : "Kirish"}
          </button>
        </form>
      </div>
    </div>
  )
}
