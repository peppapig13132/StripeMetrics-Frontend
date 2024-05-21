export const AverageStaying = () => {
  return (
    <div className="bg-white w-full rounded-xl p-5">
      <div className="flex flex-row">
        <h4 className="font-bold text-sky-600">Average Staying (in months)</h4>
        <span className="font-bold text-red-500 ms-auto">-27.36%</span>
      </div>

      <div className="flex flex-row mt-8">
        <span className="font-bold text-sky-600">3.44</span>
        <span className="text-sky-600 ms-auto">Last 30 days</span>
      </div>
    </div>
  );
}