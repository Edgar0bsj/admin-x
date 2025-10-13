"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [msg, setMsg] = useState({
    msgGlobal: "",
    msgEmail: "",
    msgPassword: "",
  });
  const router = useRouter();
  //
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3006/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      router.push("/");
    } else {
      setMsg((value) => ({ ...value, msgGlobal: data.message }));
    }
  };

  //
  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-sm shadow-md rounded-lg p-6 sm:p-8 md:max-w-md">
          <h1 className="text-6xl font-semibold text-center mb-6 font-bold italic">
            Admin X
          </h1>
          <p className="text-red-400 text-center">{msg.msgGlobal}</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">E-mail</label>
              <Input
                name="email"
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-red-400 text-center">{msg.msgEmail}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Senha</label>
              <Input
                name="password"
                type="password"
                placeholder="Digite sua senha"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-red-400 text-center">{msg.msgPassword}</p>
            </div>
            <Button
              type="submit"
              className="w-full py-4 mt-5 cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 "
            >
              Entrar
            </Button>
          </form>

          <p className="text-end text-sm text-gray-500 mt-4">
            <a
              onClick={() => {
                router.push("/login/registrar");
              }}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
