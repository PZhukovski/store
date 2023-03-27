import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Card } from '../components/card';
import { Provider } from "react-redux";
import { store } from "../store/index";

test('snapshot Card', async() => {
  const cardElement = await render(<Provider store={store}><Card/></Provider>);
  expect(cardElement).toMatchSnapshot();
});
