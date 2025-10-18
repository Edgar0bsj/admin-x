"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/style/Navbar.module.css";

/**
 * Componente principal da página com navbar moderno e tema dark
 * Utiliza React hooks para gerenciar estado do menu mobile
 */
export default function Navbar() {
  // Estado para controlar abertura/fechamento do menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Função para alternar o estado do menu mobile
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /**
   * Função para fechar o menu mobile ao clicar em um link
   */
  const closeMobileMenu = () => {
    router.push("/menu");
    setIsMobileMenuOpen(false);
  };

  const router = useRouter();

  return (
    <>
      {/* Navbar moderno com tema dark */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          {/* Logo/Brand */}
          <div className={styles.navBrand}>
            <a
              href="#"
              className={styles.brandLink}
              onClick={() => {
                router.push("/menu");
              }}
            >
              <span className={styles.brandText}>Admin-X</span>
            </a>
          </div>

          {/* Menu desktop */}
          <div className={styles.navMenu}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <a
                  href="#"
                  className={styles.navLink}
                  onClick={() => {
                    router.push("/menu");
                  }}
                >
                  Painel Principal
                </a>
              </li>
            </ul>
          </div>

          {/* Botão CTA */}
          <div className={styles.navCta}>
            <button className={styles.ctaButton}>Sair</button>
          </div>

          {/* Botão hamburger para mobile */}
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span
              className={`${styles.hamburger} ${
                isMobileMenuOpen ? styles.hamburgerActive : ""
              }`}
            >
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </span>
          </button>
        </div>

        {/* Menu mobile */}
        <div
          className={`${styles.mobileMenu} ${
            isMobileMenuOpen ? styles.mobileMenuOpen : ""
          }`}
        >
          <ul className={styles.mobileNavList}>
            <li className={styles.mobileNavItem}>
              <a
                href="#home"
                className={styles.mobileNavLink}
                onClick={closeMobileMenu}
              >
                Painel Principal
              </a>
            </li>

            <li className={styles.mobileNavItem}>
              <button
                className={styles.mobileCtaButton}
                onClick={closeMobileMenu}
              >
                Sair
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
