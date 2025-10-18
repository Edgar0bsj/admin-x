"use client";
import { useState, useEffect } from "react";
import styles from "@/style/Home.module.css";
import Navbar from "./Navbar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Efeito para detectar scroll e alterar estilo da navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Função para toggle do menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Função para smooth scroll até seção
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={styles.pageContainer}>
      {/* Navbar */}
      <Navbar />
      {/* HERO */}
      {children}
      {/* ====== */}
      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <h2 className={styles.footerTitle}>Autor</h2>
              <p className={styles.footerText}>Edgar Junior</p>
            </div>
            <div className={styles.footerSection}>
              <h3 className={styles.footerTitle}>Redes sociais</h3>
              <ul className={styles.footerLinks}>
                <li>
                  <a
                    href="https://www.linkedin.com/in/edgar-junior/"
                    className={styles.footerLink}
                  >
                    Linkedin
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/dgar_jr/"
                    className={styles.footerLink}
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h3 className={styles.footerTitle}>Contato</h3>
              <p className={styles.footerText}>
                01.edgarjunior@gmail.com
                <br />
                {/* +55 (21) 9999-9999 */}
              </p>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2025 Este projeto está sob a licença MIT.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
