import React, { ReactNode, createContext, useContext, useState } from 'react';
import { DateRange } from '../interfaces/interface';
import moment from 'moment';

interface DashboardContextProps {
  dateRange: DateRange;
  updateDateRange: (dateRange: DateRange) => void;
}

interface DashboardProviderProps {
  children: ReactNode;
}

export const defaultDateRange: DateRange = {
  startDate: moment().startOf('date').subtract(1, 'months').format('YYYY-MM-DD'),
  endDate: moment().startOf('date').format('YYYY-MM-DD')
}

const defaultDashboardContextProps: DashboardContextProps = {
  dateRange: defaultDateRange,
  updateDateRange: () => {}
};

const DashboardContext = createContext<DashboardContextProps>(defaultDashboardContextProps);

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange);

  const updateDateRange = (dateRange: DateRange) => {
    setDateRange(dateRange);
  }

  return (
    <DashboardContext.Provider value={{ dateRange, updateDateRange}}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);