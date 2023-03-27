import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { CardPreview } from '../components/card-preview';
import '@testing-library/jest-dom/extend-expect';

test('snapshot', async() => {
  const cardElement = render(<CardPreview product={{
    id: 0,
    preview: '',
    title: '',
    price: 0,
    availability: false
  }}/>);
  expect(cardElement).toMatchSnapshot();
});

