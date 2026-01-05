// types/form.ts
export interface FormStats {
  visits: number;
  submissions: number;
  submissionRate: number;
  bounceRate: number;
}

export interface Form {
  id: number;
  userId: string;
  name: string;
  description: string;
  content: string;
  published: boolean;
  visits: number;
  submissions: number;
  shareURL: string;
  createdAt: Date;
}

export interface StatsCardData {
  title: string;
  value: string;
  icon: React.ReactNode;
  helperText: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: "blue" | "amber" | "green" | "red";
}
