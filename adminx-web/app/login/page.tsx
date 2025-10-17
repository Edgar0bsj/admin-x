"use client";
import { useState } from "react";
import styles from "@/style/Login.module.css";

// Interface para os dados do formulário
interface FormData {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
}

export default function login() {
  // Estado para controlar qual formulário está ativo
  const [isLogin, setIsLogin] = useState<boolean>(true);

  // Estado para os dados do formulário
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  // Estado para mensagens de erro
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Estado para carregamento
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Função para atualizar os dados do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Função de validação do formulário
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Validação do email
    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    // Validação da senha
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    // Validações específicas para registro
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "Nome é obrigatório";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirmação de senha é obrigatória";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Senhas não coincidem";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função para submeter o formulário
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulação de requisição para API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Aqui você faria a chamada real para sua API
      console.log(isLogin ? "Login:" : "Registro:", formData);

      // Simulação de sucesso
      alert(
        isLogin
          ? "Login realizado com sucesso!"
          : "Registro realizado com sucesso!"
      );

      // Limpar formulário
      setFormData({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Erro:", error);
      alert("Ocorreu um erro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Função para alternar entre login e registro
  const toggleForm = (): void => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    });
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        {/* Cabeçalho */}
        <div className={styles.authHeader}>
          <h1 className={styles.authTitle}>
            {isLogin ? "Login" : "Criar conta"}
          </h1>
          <p className={styles.authSubtitle}>
            {isLogin
              ? "Entre na sua conta para continuar"
              : "Preencha os dados abaixo para criar sua conta"}
          </p>
        </div>

        {/* Formulário */}
        <form className={styles.authForm} onSubmit={handleSubmit}>
          {/* Campo Nome (apenas no registro) */}
          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                Nome completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`${styles.formInput} ${
                  errors.name ? styles.error : ""
                }`}
                placeholder="Digite seu nome completo"
                disabled={isLoading}
              />
              {errors.name && (
                <span className={styles.errorMessage}>{errors.name}</span>
              )}
            </div>
          )}

          {/* Campo Email */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`${styles.formInput} ${
                errors.email ? styles.error : ""
              }`}
              placeholder="Digite seu email"
              disabled={isLoading}
            />
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>

          {/* Campo Senha */}
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`${styles.formInput} ${
                errors.password ? styles.error : ""
              }`}
              placeholder="Digite sua senha"
              disabled={isLoading}
            />
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password}</span>
            )}
          </div>

          {/* Campo Confirmar Senha (apenas no registro) */}
          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.formLabel}>
                Confirmar senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`${styles.formInput} ${
                  errors.confirmPassword ? styles.error : ""
                }`}
                placeholder="Confirme sua senha"
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <span className={styles.errorMessage}>
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          )}

          {/* Esqueceu a senha (apenas no login) */}
          {isLogin && (
            <div className={styles.forgotPassword}>
              <button
                type="button"
                className={styles.forgotPasswordLink}
                disabled={isLoading}
              >
                Esqueceu sua senha?
              </button>
            </div>
          )}

          {/* Botão de submit */}
          <button
            type="submit"
            className={`${styles.submitButton} ${
              isLoading ? styles.loading : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.spinner}></span>
            ) : isLogin ? (
              "Entrar"
            ) : (
              "Criar conta"
            )}
          </button>
        </form>

        {/* Link para alternar entre login e registro */}
        <div className={styles.toggleForm}>
          <span className={styles.toggleText}>
            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
          </span>
          <button
            type="button"
            className={styles.toggleButton}
            onClick={toggleForm}
            disabled={isLoading}
          >
            {isLogin ? "Criar conta" : "Fazer login"}
          </button>
        </div>
      </div>
    </div>
  );
}
