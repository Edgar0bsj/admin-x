"use client";
import LayoutPages from "@/components/LayoutPages";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function Home() {
  // =================
  // hook State
  const [user, setUser] = useState("");
  // =================
  // hook Router
  const router = useRouter();

  // =================
  // hook Effect
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get<{ email: string }>("/auth/check", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.email);
      } catch (error) {
        router.push("/login");
      }
    };

    checkAuth();
  }, []);

  //
  function logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <>
      <LayoutPages logout={logout}>
        <main className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-screen">
          <div className="rounded-lg border border-sky-500 flex flex-col items-center col-span-2 justify-center text-5xl italic font-bold">
            <strong>Visão Geral</strong>
          </div>
          <aside>
            <div className="rounded-lg border border-sky-500 shadow rounded-lg p-6 sm:p-10">
              <div className="flex flex-col gap-2 text-center items-center">
                <p className="font-semibold">Email: {user}</p>
                <div className="text-sm flex items-center">
                  <p>Conteudo!</p>
                </div>
              </div>
              <div className="flex justify-center items-center gap-4 my-4 flex-wrap">
                <p>Conteudo!</p>
              </div>
            </div>
          </aside>
        </main>
      </LayoutPages>
    </>
  );
}
