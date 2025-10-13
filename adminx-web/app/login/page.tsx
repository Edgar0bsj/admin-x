"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/services/api";
import { Elsie } from "next/font/google";

export default function Login() {
  // ============
  // hook State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msgErr, setMsgErr] = useState("");
  // ============
  // hook Router
  const router = useRouter();
  // ============
  // Function onSubmit
  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    try {
      const { data } = (await api.post("/auth/login", {
        email,
        password,
      })) as { data: { token: string } };

      localStorage.setItem("token", data.token);

      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMsgErr("Email ou Senha inválidos");
        console.error("[Error]>> " + error);
      } else {
        console.error("[Error não esperado]>> " + error);
      }
    }
  }

  //
  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-sm shadow-md rounded-lg p-6 sm:p-8 md:max-w-md">
          <h1 className="text-6xl font-semibold text-center mb-6 font-bold italic">
            Admin X
          </h1>
          <p className="text-red-400 text-center">
            <strong>{msgErr}</strong>
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">E-mail</label>
              <Input
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="email"
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Senha</label>
              <Input
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
                type="password"
                placeholder="Digite sua senha"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
