export interface DailySum {
  id: number;
  sum: number;
  date: string;
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

export interface DateRange {
  startDate: string | null;
  endDate: string | null;
}