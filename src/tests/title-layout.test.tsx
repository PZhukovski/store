import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store/index";
import { TitleLayout } from "../components/title-layout";

it("renders welcome message", () => {
  render(
    <Provider store={store}>
      <TitleLayout
        title={"Бархатные стикеры"}
        description={"Test"}
        color={"negative"}
      />
    </Provider>
  );
  expect(screen.getByText("Бархатные стикеры")).toBeInTheDocument();
});
