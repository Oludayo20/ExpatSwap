import Layout from './components/Layout';
import useTitle from './hooks/useTitle';

function App() {
  useTitle('Expat-Swap');
  return <Layout />;
}

export default App;
