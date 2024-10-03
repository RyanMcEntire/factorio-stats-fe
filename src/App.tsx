import ProdSnapshotBarChart from "./charts/ProdSnapshotBarChart";
import { ApiProvider } from "./utility-components/ApiContext";

export default function App() {
  return (
    <ApiProvider>
      <div>
        <h1>Total Produced Items</h1>
        <ProdSnapshotBarChart />
      </div>
    </ApiProvider>
  );
}
