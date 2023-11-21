import 'App.css';
import AppRouter from 'AppRouter';
import { BrowserRouter } from 'react-router-dom'
import { Alert, ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';

const { ErrorBoundary } = Alert;

function App() {
  return (
    <ConfigProvider locale={enUS}>
      <ErrorBoundary>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ErrorBoundary>
    </ConfigProvider>
  );
}

export default App;