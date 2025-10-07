"use client";
import LayoutPages from "@/components/LayoutPages";

export default function Home() {
  return (
    <>
      <LayoutPages>
        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-grow">
          <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Bem-vindo!</h2>
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
