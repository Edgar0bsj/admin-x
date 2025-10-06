"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Registre() {
  const router = useRouter();
  return (
    <div className="container flex flex-col justify-center items-center h-screen mx-auto">
      <div className="grid grid-cols-3 gap-4 w-full max-w-96">
        <div className="col-span-3 flex justify-center items-center text-6xl my-6">
          <h1>
            <strong>Criar Conta</strong>
          </h1>
        </div>
        <div className="col-span-3">
          <Label className="mb-2" htmlFor="picture">
            Nome
          </Label>
          <Input type="text" placeholder="Nome" />
        </div>
        <div className="col-span-3">
          <Label className="mb-2" htmlFor="picture">
            Email
          </Label>
          <Input type="email" placeholder="Email" />
        </div>
        <div className="col-span-3">
          <Label className="mb-2" htmlFor="picture">
            Telefone
          </Label>
          <Input type="number" placeholder="(21) 9 99999-9999" />
        </div>

        <div className="col-span-3 flex flex-row justify-center items-center gap-8">
          <Button type="submit" variant="outline">
            Criar conta
          </Button>

          <Button
            type="submit"
            variant="outline"
            onClick={() => {
              router.push("/");
            }}
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}
