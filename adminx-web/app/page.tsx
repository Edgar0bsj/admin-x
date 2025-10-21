"use client";
import { useRouter } from "next/navigation";
import styles from "@/style/Home.module.css";
import Layout from "@/components/base/Base";
import Image from "next/image";

export default function home() {
  const router = useRouter();
  return (
    <>
      <Layout>
        {/* Hero Section */}
        <section id="home" className={styles.hero}>
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Bem-vindo ao Admin-X</h1>
              <p className={styles.heroSubtitle}>
                Este projeto é de uso pessoal e está em constante evolução.
                Sinta-se à vontade para sugerir melhorias ou adaptar para suas
                próprias necessidades.
              </p>
              <div className={styles.heroButtons}>
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Começar Agora
                </button>
                <a href="https://github.com/Edgar0bsj/admin-x">
                  <button className={`${styles.btn} ${styles.btnSecondary}`}>
                    Github
                  </button>
                </a>
              </div>
            </div>
            <div className={styles.heroImage}>
              <div className={styles.heroImagePlaceholder}>
                <Image
                  src="/assets/adminX.png"
                  width={500}
                  height={500}
                  alt="Admin-X Logo"
                  priority
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        {/* About Section */}
        <section id="about" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Sobre Adminx</h2>
            <p className={styles.sectionText}>
              Me chamo Edgar tenho 26 anos e sou apaixonado por programação.
              Adoro explorar novas linguagens, frameworks e ferramentas, e cada
              projeto que desenvolvo me desafia a pensar de formas diferentes.
              Decidi criar uma página para reunir minhas aplicações pessoais, de
              forma que atenda perfeitamente às minhas necessidades. Pensei:
              “Seria incrível ter um site que me ajude a organizar minha vida.”
              E assim nasceu o Admin-X.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className={styles.sectionAlt}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Serviços</h2>
            <div className={styles.servicesGrid}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>💸</div>
                <h3 className={styles.serviceTitle}>Controle financeiro</h3>
                <p className={styles.serviceDescription}>
                  Gerencie suas despesas com praticidade e clareza.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="codigo" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Código</h2>
            <div className={styles.contactContent}>
              <p className={styles.contactText}>
                Fique à vontade para ver o código
              </p>
              <a href="https://github.com/Edgar0bsj/admin-x">
                <button
                  className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`}
                >
                  Github
                </button>
              </a>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
