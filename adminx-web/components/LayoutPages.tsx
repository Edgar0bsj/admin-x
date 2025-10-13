"use client";
import { Button } from "@/components/ui/button";

export default function LayoutPages(props: any) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* NAVBAR */}
        <header className="p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-[30px] italic font-bold">Admin X</h1>
            <nav className="space-x-1 ">
              <a href="#">
                <Button className="bg-cyan-500">Home</Button>
              </a>
              <a href="#">
                <Button className="bg-cyan-500">Perfil</Button>
              </a>
              <a href="#" onClick={props.logout}>
                <Button className="bg-cyan-500">Sair</Button>
              </a>
            </nav>
          </div>
        </header>
        <hr />

        {/* CONTEÚDO PRINCIPAL */}
        {props.children}

        {/* FOOTER */}
        <footer className="bg-gray-800 text-white text-center p-4">
          <div className="container mx-auto">
            <p>
              © 2025 Criado por <strong>Edgar Junior</strong>.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
