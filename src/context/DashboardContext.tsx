import React, { ReactNode, createContext, useContext, useState } from 'react';
import { DateRange } from '../interfaces/interface';
import moment from 'moment';

interface DashboardContextProps {
  dateRange: DateRange;
  days: number;
  updateDateRange: (dateRange: DateRange) => void;
}

interface DashboardProviderProps {
  children: ReactNode;
}

export const defaultDateRange: DateRange = {
  startDate: moment().startOf('date').subtract(1, 'months').format('YYYY-MM-DD'),
  endDate: moment().startOf('date').format('YYYY-MM-DD')
}

const defaultDays: number = moment(defaultDateRange.endDate).diff(moment(defaultDateRange.startDate), 'days')

const defaultDashboardContextProps: DashboardContextProps = {
  dateRange: defaultDateRange,
  days: moment(defaultDateRange.endDate).diff(moment(defaultDateRange.startDate), 'days'),
  updateDateRange: () => {}
};

const DashboardContext = createContext<DashboardContextProps>(defaultDashboardContextProps);

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange);
  const [days, setDays] = useState(defaultDays);

  const updateDateRange = (dateRange: DateRange) => {
    setDateRange(dateRange);
    setDays(moment(dateRange.endDate).diff(moment(dateRange.startDate), 'days'));
  }

  return (
    <DashboardContext.Provider value={{ dateRange, days, updateDateRange}}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);