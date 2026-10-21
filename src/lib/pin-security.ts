// Cryptographic utility for client-side transfer PIN hashing and salt management

export async function hashPin(pin: string, salt: string = "us-finance-bank-salt-v1"): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(`${salt}:${pin.trim()}`);
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  // Fallback simple hash for older environments
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const byte = data[i] ?? 0;
    hash = (hash << 5) - hash + byte;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(16, "0");
}

export interface PinState {
  hashedPin: string;
  failedAttempts: number;
  lockedUntil: number | null; // epoch ms if temporarily locked
}
