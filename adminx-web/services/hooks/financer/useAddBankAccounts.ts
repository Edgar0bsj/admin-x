"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../api";

/**
 * Interfacers
 */
interface Account {
  id: string;
  name: string;
  balance: number;
  type: "Crédito" | "Débito";
  createdAt: string;
}
// ====================

export default function useAddBanckAccounts(
  name: string,
  type: string,
  balance: number
) {
  const [accounts, setAccounts] = useState<any>("");
  const router = useRouter();

  async function bootstrap() {
    return new Promise((resulve, reject) => {
      try {
        api
          .post("/account", {
            name,
            type,
            balance,
          })
          .then((response) => {
            resulve(response.status);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  useEffect(() => {
    bootstrap().then((result) => {
      console.log(result);
      setAccounts("ok");
    });
  }, [router]);

  return accounts;
}
