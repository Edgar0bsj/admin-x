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
              <a href="#" onClick={props.logout}>
                <button
                  className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  data-ripple-light="true"
                >
                  Logout
                </button>
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
