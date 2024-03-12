import { AppRoot, Group, Panel, SplitCol, SplitLayout } from '@vkontakte/vkui';
import { type FC } from 'react';

export const App: FC = () => (
  <AppRoot>
    <SplitLayout>
      <SplitCol autoSpaced style={{ flexGrow: 3 }}>
        <Panel>
          <Group></Group>
        </Panel>
      </SplitCol>
      <SplitCol autoSpaced style={{ flexGrow: 1 }}>
        <Panel>
          <Group></Group>
        </Panel>
      </SplitCol>
    </SplitLayout>
  </AppRoot>
);
