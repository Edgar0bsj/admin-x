"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/style/Menu.module.css";
import Layout from "@/components/base/Layout";

// Interface para definir a estrutura dos cards de funcionalidade
interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  badge?: string;
  stats?: {
    label: string;
    value: string;
  };
}

// Dados mock das funcionalidades do sistema
const featuresData: FeatureCard[] = [
  {
    id: "finances",
    title: "Finanças",
    description: "Controler financeiro",
    icon: "💸",
    color: "#04c146ff",
    badge: "novo",
    stats: {
      label: "Status",
      value: "Em Desenvolvimento",
    },
  },
];

// Componente principal da página de cards
export default function menu() {
  const router = useRouter();
  // Estado para controlar a busca/filter
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Estado para controlar a categoria selecionada
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Estado para controlar o modo de visualização
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Categorias disponíveis
  const categories = [
    { id: "all", name: "Todas", icon: "" },
    { id: "finances", name: "Finanças", icon: "" },
  ];

  // Filtrar cards baseado na busca e categoria
  const filteredFeatures = featuresData.filter((feature) => {
    const matchesSearch =
      feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || feature.id.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Função para lidar com clique no card
  const handleCardClick = (featureId: string): void => {
    console.log(`Navigating to feature: ${featureId}`);
    if (featureId === "finances") router.push("/financer");
    // Aqui você implementaria a navegação real
    // Ex: navigate(`/features/${featureId}`);
  };

  // Componente Card individual
  const FeatureCardComponent: React.FC<{ feature: FeatureCard }> = ({
    feature,
  }) => (
    <div
      className={styles.featureCard}
      onClick={() => handleCardClick(feature.id)}
      style={{ "--card-color": feature.color } as React.CSSProperties}
    >
      {/* Cabeçalho do card */}
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>
          <span className={styles.iconEmoji}>{feature.icon}</span>
        </div>
        {feature.badge && (
          <span className={styles.cardBadge}>{feature.badge}</span>
        )}
      </div>

      {/* Conteúdo do card */}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{feature.title}</h3>
        <p className={styles.cardDescription}>{feature.description}</p>
      </div>

      {/* Estatísticas (se existirem) */}
      {feature.stats && (
        <div className={styles.cardStats}>
          <span className={styles.statsLabel}>{feature.stats.label}</span>
          <span className={styles.statsValue}>{feature.stats.value}</span>
        </div>
      )}

      {/* Footer do card */}
      <div className={styles.cardFooter}>
        <span className={styles.cardAction}>Acessar →</span>
      </div>
    </div>
  );

  return (
    <>
      <Layout>
        <main className={styles.mainContainer} style={{ paddingTop: "25vh" }}>
          {/* Header da página */}
          <header className={styles.pageHeader}>
            <div className={styles.headerContent}>
              <h1 className={styles.pageTitle}>Painel Principal</h1>
              <p className={styles.pageSubtitle}>
                Selecione uma funcionalidade
              </p>
            </div>
          </header>

          {/* Barra de ferramentas */}
          <div className={styles.toolbar}>
            {/* Campo de busca */}
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Buscar funcionalidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <span className={styles.searchIcon}>🔍</span>
            </div>

            {/* Controles de visualização */}
            <div className={styles.viewControls}>
              {/* Filtro de categorias */}
              <div className={styles.categoryFilter}>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`${styles.categoryButton} ${
                      selectedCategory === category.id ? styles.active : ""
                    }`}
                  >
                    <span className={styles.categoryIcon}>{category.icon}</span>
                    <span className={styles.categoryName}>{category.name}</span>
                  </button>
                ))}
              </div>

              {/* Alternador de modo de visualização */}
              <div className={styles.viewModeToggle}>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`${styles.viewModeButton} ${
                    viewMode === "grid" ? styles.active : ""
                  }`}
                  title="Modo Grade"
                >
                  ⊞
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`${styles.viewModeButton} ${
                    viewMode === "list" ? styles.active : ""
                  }`}
                  title="Modo Lista"
                >
                  ☰
                </button>
              </div>
            </div>
          </div>

          {/* Grid de cards */}
          <div className={styles.cardsContainer}>
            {filteredFeatures.length > 0 ? (
              <div className={`${styles.cardsGrid} ${styles[viewMode]}`}>
                {filteredFeatures.map((feature) => (
                  <FeatureCardComponent key={feature.id} feature={feature} />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>🔍</div>
                <h3 className={styles.emptyTitle}>
                  Nenhuma funcionalidade encontrada
                </h3>
                <p className={styles.emptyDescription}>
                  Tente ajustar sua busca ou selecionar outra categoria
                </p>
              </div>
            )}
          </div>

          {/* Footer informativo */}
          <footer className={styles.pageFooter}>
            <div className={styles.footerContent}>
              <p className={styles.footerText}>
                Mostrando {filteredFeatures.length} de {featuresData.length}{" "}
                funcionalidades
              </p>
            </div>
          </footer>
        </main>
      </Layout>
    </>
  );
}
