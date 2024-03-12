import ReactDOM from 'react-dom/client';
import { App } from './app';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider appearance="light">
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>,
);
