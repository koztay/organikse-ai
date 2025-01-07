import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function maskEmail(email: string): string {
  if (!email) return 'Anonymous'
  
  const [localPart, domain] = email.split('@')
  if (!domain) return email

  if (localPart.length <= 2) {
    return `${localPart}@${domain}`
  }

  const firstChar = localPart[0]
  const lastChar = localPart[localPart.length - 1]
  const maskedPart = '*'.repeat(localPart.length - 2)
  
  return `${firstChar}${maskedPart}${lastChar}@${domain}`
} 