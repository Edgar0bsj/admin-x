"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  return (
    <>
      <section className="container mx-auto h-screen">
        <div className="grid grid-cols-3 grid-row-3 gap-1 h-full place-items-center justify-items-center">
          <div></div>
          <div></div>
          <div></div>
          {/*  */}
          <div></div>
          <div className="container mx-auto">
            <div className="grid grid-row-6 gap-1">
              {/* row 1 */}
              <div className="flex justify-center mb-5">
                <h1 className="text-6xl italic font-bold">Admin X</h1>
              </div>
              {/* row 2 */}
              <div className="flex justify-start">
                <label>Email</label>
              </div>
              {/* row 3 */}
              <div className="border-2 border-solid rounded-lg mb-3">
                <Input placeholder="Usuario@email.com" />
              </div>
              {/* row 4 */}
              <div className="flex justify-start">
                <label>Senha</label>
              </div>
              {/* row 5 */}
              <div className="border-2 border-solid rounded-lg">
                <Input type="password" placeholder="*********" />
              </div>
              {/* row 6 */}
              <div className="flex justify-center gap-4 mt-5">
                <Button className="w-40" variant="outline">
                  Entrar
                </Button>
                <Button variant="outline">Criar uma conta</Button>
              </div>
            </div>
          </div>
          <div></div>
          {/*  */}
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
    </>
  );
}
