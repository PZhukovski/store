import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { MadeInAlfa } from '../components/made-in-alfa';
import { useTypeSelector } from '../hooks/use-type-selector';
import { Provider } from "react-redux";
import { store } from "../store/index";

jest.mock('react-redux')

const data = [
  {
    id: 1,
    preview: "preview",
    title: "title",
    price: 4999,
    availability: true,
  },
  {
    id: 2,
    preview: "preview",
    title: "title",
    price: 1999,
    availability: true,
  }
];

describe("MadeInAlfa", () => {

  it("should create MadeInAlfa products with empty", ()=>{
    // @ts-ignore
  useTypeSelector.mockReturnValue([])
  const component = render(<Provider store={store}><MadeInAlfa/></Provider>)
  expect(component).toMatchSnapshot
})
  it("should create MadeInAlfa products", ()=>{
      // @ts-ignore
    useTypeSelector.mockReturnValue(data)
    const component = render(<Provider store={store}><MadeInAlfa/></Provider>)
    expect(component).toMatchSnapshot
  })

})