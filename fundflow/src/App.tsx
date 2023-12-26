import AppRouter from 'AppRouter';
import { BrowserRouter } from 'react-router-dom'
import { Alert, ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import { Suspense } from 'react';
import { ProConfigProvider } from '@ant-design/pro-components';
import 'App.css';

const { ErrorBoundary } = Alert;

function App() {
  return (
    <ConfigProvider locale={enUS}>
      <ProConfigProvider dark>
        <ErrorBoundary>
          <BrowserRouter>
            <Suspense>
              <AppRouter />
            </Suspense>
          </BrowserRouter>
        </ErrorBoundary>
      </ProConfigProvider>
    </ConfigProvider>
  );
}

export default App;