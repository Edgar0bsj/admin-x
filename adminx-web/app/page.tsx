"use client";
import LayoutPages from "@/components/LayoutPages";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    try {
      (async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3006/auth/check", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          router.push("/login");
        }
        const resData = await res.json();
        setUser(resData.message);
      })();
    } catch (error) {
      router.push("/login");
    }
  }, []);
  //
  function logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <>
      <LayoutPages logout={logout}>
        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-grow">
          <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Bem-vindo! {user}</h2>
            <p className="text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
              vestibulum erat, nec ultricies lorem. Sed efficitur, tortor ac
              ultrices luctus, nisl est ultrices metus, non ultricies eros nulla
              nec turpis.
            </p>
          </div>
        </main>
      </LayoutPages>
    </>
  );
}
