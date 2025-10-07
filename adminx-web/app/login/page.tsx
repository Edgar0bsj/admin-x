"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-sm shadow-md rounded-lg p-6 sm:p-8 md:max-w-md">
          <h1 className="text-6xl font-semibold text-center mb-6 font-bold italic">
            Admin X
          </h1>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">E-mail</label>
              <Input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Senha</label>
              <Input
                type="password"
                placeholder="Digite sua senha"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button type="submit" className="w-full py-4 mt-5">
              Entrar
            </Button>
          </form>

          <p className="text-end text-sm text-gray-500 mt-4">
            <a href="#" className="text-blue-600 hover:underline">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
