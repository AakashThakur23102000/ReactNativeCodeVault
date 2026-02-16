/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { store, persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

if (__DEV__) {
    require("./ReactotronConfig");
}

function AppMain() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                    <App />
            </PersistGate>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => AppMain);
