export function debug(obj: any, label = "DEBUG") {
  console.log(`\n=== ${label} ===`);
  console.log("Tipo:", typeof obj);
  console.log("É array?", Array.isArray(obj));
  console.log("Keys:", Object.keys(obj));
  console.log("Valor:", JSON.stringify(obj?.toObject?.() || obj, null, 2));
  console.log("================\n");
}

type Primitive =
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "undefined"
  | "any"
  | "unknown";

// Cache para evitar loops infinitos e melhorar performance
const typeCache = new Map();
const MAX_DEPTH = 10;

export function detectType(value: any, depth = 0): string {
  // Proteção contra loops infinitos
  if (depth > MAX_DEPTH) {
    return "any";
  }

  // Verifica cache primeiro (apenas para objetos não-null)
  if (
    typeof value === "object" &&
    value !== null &&
    value !== undefined &&
    typeCache.has(value)
  ) {
    return typeCache.get(value);
  }

  let result: string;

  if (value === null) {
    result = "null";
  } else if (value === undefined) {
    result = "undefined";
  } else if (Array.isArray(value)) {
    if (value.length === 0) {
      result = "any[]";
    } else {
      // Detecta tipos dos itens e cria union se necessário
      const itemTypes = Array.from(
        new Set(value.map((v) => detectType(v, depth + 1)))
      );
      if (itemTypes.length === 1) {
        result = `${itemTypes[0]}[]`;
      } else {
        result = `(${itemTypes.join(" | ")})[]`;
      }
    }
  } else if (value instanceof Date) {
    result = "Date";
  } else if (value instanceof Map) {
    result = "Map<any, any>";
  } else if (value instanceof Set) {
    result = "Set<any>";
  } else if (value instanceof RegExp) {
    result = "RegExp";
  } else if (value instanceof Error) {
    result = "Error";
  } else {
    const t = typeof value;
    if (t === "string") {
      result = "string";
    } else if (t === "number") {
      result = "number";
    } else if (t === "boolean") {
      result = "boolean";
    } else if (t === "function") {
      result = "(...args: any[]) => any";
    } else if (t === "object") {
      // object -> build inline type recursively
      const keys = Object.keys(value);
      if (keys.length === 0) {
        result = "Record<string, any>";
      } else {
        const parts = keys.map((k) => {
          const val = value[k];
          const propType = detectType(val, depth + 1);
          // make optional if undefined
          const optional = val === undefined ? "?" : "";
          const keyName = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(k)
            ? k
            : JSON.stringify(k);
          return `${keyName}${optional}: ${propType};`;
        });
        result = `{\n${parts.map((p) => "  " + p).join("\n")}\n}`;
      }
    } else {
      result = "unknown";
    }
  }

  // Armazena no cache (apenas para objetos)
  if (typeof value === "object" && value !== null) {
    typeCache.set(value, result);
  }
  return result;
}

/**
 * debugType: imprime info e sugere um type TS para o objeto fornecido
 */
export function debugType(obj: any, label = "DebugType") {
  console.log(`\n=== ${label} ===`);
  console.log("Tipo runtime:", Object.prototype.toString.call(obj));
  console.log("Primitivo (typeof):", typeof obj);
  console.log("É array?", Array.isArray(obj));
  console.log("Keys:", obj && typeof obj === "object" ? Object.keys(obj) : []);
  console.log(
    "Tamanho:",
    Array.isArray(obj)
      ? obj.length
      : obj && typeof obj === "object"
      ? Object.keys(obj).length
      : "N/A"
  );

  try {
    const exampleValue = obj?.toObject?.() ?? obj;
    console.log("Valor (exemplo):", JSON.stringify(exampleValue, null, 2));
  } catch (e) {
    console.log("Valor: (não foi possível serializar)", (e as any).message);
  }

  // Sugestão de tipo
  const safeLabel = label.replace(/\W+/g, "_");
  const suggestedType = (() => {
    try {
      const t = detectType(obj);
      // se for um objeto inline, criamos um `type Name = {...}`; se for array ou primitivo, usamos diretamente
      if (t.startsWith("{")) {
        return `type ${safeLabel} = ${t};`;
      } else {
        return `type ${safeLabel} = ${t};`;
      }
    } catch (error) {
      return `type ${safeLabel} = any; // Erro na detecção: ${
        (error as any).message
      }`;
    }
  })();

  console.log("\n--- Sugestão de TypeScript ---");
  console.log(suggestedType);
  console.log("---------------------------------");
}

/**
 * Função para limpar o cache de tipos
 */
export function clearTypeCache() {
  typeCache.clear();
  console.log("Cache de tipos limpo");
}

/**
 * Função para detectar tipos com configurações personalizadas
 */
export function detectTypeAdvanced(
  value: any,
  options: {
    maxDepth?: number;
    includeFunctions?: boolean;
    includePrivate?: boolean;
  } = {}
): string {
  const {
    maxDepth = 10,
    includeFunctions = true,
    includePrivate = false,
  } = options;

  // Cache local para esta função (sem problemas de WeakMap)
  const localCache = new Map();

  function detect(value: any, depth: number): string {
    if (depth > maxDepth) return "any";

    // Verifica cache local apenas para objetos
    if (
      typeof value === "object" &&
      value !== null &&
      value !== undefined &&
      localCache.has(value)
    ) {
      return localCache.get(value);
    }

    let result: string;

    if (value === null) {
      result = "null";
    } else if (value === undefined) {
      result = "undefined";
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        result = "any[]";
      } else {
        const itemTypes = Array.from(
          new Set(value.map((v) => detect(v, depth + 1)))
        );
        result =
          itemTypes.length === 1
            ? `${itemTypes[0]}[]`
            : `(${itemTypes.join(" | ")})[]`;
      }
    } else if (value instanceof Date) {
      result = "Date";
    } else if (value instanceof Map) {
      result = "Map<any, any>";
    } else if (value instanceof Set) {
      result = "Set<any>";
    } else if (value instanceof RegExp) {
      result = "RegExp";
    } else if (value instanceof Error) {
      result = "Error";
    } else {
      const t = typeof value;
      if (t === "string") {
        result = "string";
      } else if (t === "number") {
        result = "number";
      } else if (t === "boolean") {
        result = "boolean";
      } else if (t === "function") {
        result = includeFunctions ? "(...args: any[]) => any" : "Function";
      } else if (t === "object") {
        const keys = Object.keys(value);
        if (keys.length === 0) {
          result = "Record<string, any>";
        } else {
          const filteredKeys = includePrivate
            ? keys
            : keys.filter((k) => !k.startsWith("_"));
          const parts = filteredKeys.map((k) => {
            const val = value[k];
            const propType = detect(val, depth + 1);
            const optional = val === undefined ? "?" : "";
            const keyName = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(k)
              ? k
              : JSON.stringify(k);
            return `${keyName}${optional}: ${propType};`;
          });
          result = `{\n${parts.map((p) => "  " + p).join("\n")}\n}`;
        }
      } else {
        result = "unknown";
      }
    }

    // Armazena no cache local apenas para objetos
    if (typeof value === "object" && value !== null && value !== undefined) {
      localCache.set(value, result);
    }

    return result;
  }

  return detect(value, 0);
}
