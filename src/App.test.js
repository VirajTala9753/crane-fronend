import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store, persistor } from './app/store'
import App from './App'
import { PersistGate } from 'redux-persist/integration/react'

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  )

  expect(getByText(/learn/i)).toBeInTheDocument()
})
