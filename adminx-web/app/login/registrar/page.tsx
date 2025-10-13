"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function Registrar() {
  // ====================
  // hook State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [msgError, setMsgError] = useState([]) as any;
  // ====================
  // hook Router
  const router = useRouter();
  // ====================
  // onSubmit
  async function handleSubmit(e: any) {
    e.preventDefault();
    if (password1 != password2) {
      setMsgError(["Senha não é compativel"]);
      return;
    }
    try {
      const result = await api.post("/auth/register", {
        name,
        email,
        password: password1,
      });
      if (result.status === 201) {
        alert("Usuario criando com sucesso!");
        router.push("/login");
        return;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMsgError(["[Error]>> favor tente mais tarde"]);
        console.error("[Error] >> ", error.message);
      }
      if (typeof error === "object" && error !== null && "response" in error) {
        type ResponseError = {
          response: {
            data: {
              message: string;
            };
          };
        };
        setMsgError([(error as ResponseError).response.data.message]);
      }
    }
  }
  // ====================
  // Mensagem condicional
  let msgValidation =
    msgError.length != 0 ? (
      <>
        <div className="flex flex-col justify-start text-start bg-red-950 rounded-md my-3 py-3">
          {msgError.map((el: string, index: number) => (
            <p key={index} className="text-red-400 px-4">
              • {el}
            </p>
          ))}
        </div>
      </>
    ) : (
      <></>
    );
  // ====================

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-sm shadow-md rounded-lg p-6 sm:p-8 md:max-w-md">
          <h1 className="text-6xl font-semibold text-center mb-6 font-bold italic">
            Registrar
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <Input
                required
                value={name}
                onChange={(elemento) => {
                  setName(elemento.target.value);
                }}
                name="name"
                type="text"
                placeholder="Digite seu nome"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                required
                value={email}
                onChange={(elemento) => {
                  setEmail(elemento.target.value);
                }}
                name="email"
                type="email"
                placeholder="Digite seu Email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Senha</label>
              <Input
                required
                value={password1}
                onChange={(elemento) => {
                  setPassword1(elemento.target.value);
                }}
                name="password1"
                type="password"
                placeholder="Digite sua senha"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirmar Senha
              </label>

              <Input
                required
                value={password2}
                onChange={(elemento) => {
                  setPassword2(elemento.target.value);
                }}
                name="password2"
                type="password"
                placeholder="Digite sua senha"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* aviso de erros de validação */}
              {msgValidation}
            </div>
            <Button
              type="submit"
              className="w-full py-4 mt-5 cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            >
              Registrar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
