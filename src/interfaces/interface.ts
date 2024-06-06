import { ReactNode } from "react";

export interface User {
  id?: number;
  email?: string;
}

export interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
  appLogin: (user: User, token: string) => void;
  appLogout: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface DailySum {
  id: number;
  sum: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChartData {
  xData: string[];
  yData: number[];
}

export interface StripeOldDataRow {
  id: number;
  active_customer_counts: boolean | false;
  churn_rates: boolean | false;
  daily_active_subscription_counts: boolean | false;
  daily_sums: boolean | false;
  date: string | '';
  createdAt: string | '';
  updatedAt: string | '';
}