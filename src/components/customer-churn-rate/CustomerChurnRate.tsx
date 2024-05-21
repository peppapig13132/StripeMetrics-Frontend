export const CustomerChurnRate = () => {
  return (
    <div className="bg-white w-full rounded-xl p-5">
      <div className="flex flex-row">
        <h4 className="font-bold text-sky-600">Customer Churn Rate</h4>
        <span className="font-bold text-red-500 ms-auto">-16%</span>
      </div>

      <div className="flex flex-row mt-8">
        <span className="font-bold text-sky-600">23.33%</span>
        <span className="text-sky-600 ms-auto">Last 30 days</span>
      </div>
    </div>
  );
}