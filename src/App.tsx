import { FactorioStats } from "./charts/FactorioStats";
import { ApiProvider } from "./utility-components/ApiContext";
import ErrorBoundary from "./utility-components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <ApiProvider>
        <div>
          <FactorioStats />
        </div>
      </ApiProvider>
    </ErrorBoundary>
  );
}
