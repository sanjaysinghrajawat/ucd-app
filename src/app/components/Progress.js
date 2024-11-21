// Custom Progress Bar Component
const Progress = ({ value }) => (
  <div className="w-full bg-gray-200 rounded h-2 mt-4">
    <div
      className="bg-blue-500 h-full rounded"
      style={{ width: `${value}%` }}
    />
  </div>
);

export default Progress;