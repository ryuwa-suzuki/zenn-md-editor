import Home from './components/Home';
import { ZennContentProvider } from './contexts/ZennContext';

const App: React.FC = () => {
  return (
    <ZennContentProvider>
      <Home/>
    </ZennContentProvider>
  )
}

export default App;
