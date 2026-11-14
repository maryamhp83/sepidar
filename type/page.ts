export interface RecoveryPageProps {
  searchParams: Promise<{
    userId?: string;
    secret?: string;
    expire?: string;
  }>;
}

export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}
