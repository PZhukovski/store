import { fetchYourDesign } from "../slices/your-design-slice";
import axios from "axios";

jest.mock("axios", () => {
  return {
    get: jest.fn(),
  };
});
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("yourDesignThunk", () => {
  it("should fetchYourDesign with resolved response", async () => {
    const mockProducts = [
      {
        id: 1,
        title: "бархатные стикеры",
        description: "Это бархатные стикеры",
        products: {
          id: 2,
          preview: "preview",
          title: "title",
          price: 4999,
          availability: true,
        },
      },
    ];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(
      mockProducts
    );

    const dispatch = jest.fn();
    const thunk = fetchYourDesign();
    await thunk(
      dispatch,
      () => ({}),
      () => ({})
    );
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;
    expect(start[0].type).toBe("your_design/pending");
    expect(end[0].type).toBe("your_design/fulfilled");
    expect(end[0].payload).toBe(mockProducts);
  });
  it("should fetchYourDesign with rejected response", async () => {
    const err = new Error("Wrong inputs passed in");
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(
      err
    );

    const dispatch = jest.fn();
    const thunk = fetchYourDesign();
    await thunk(
      dispatch,
      () => ({}),
      () => ({})
    );
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;
    expect(start[0].type).toBe("your_design/pending");
    expect(end[0].type).toBe("your_design/rejected");
    expect(end[0].error.message).toBe("Can't axios");
  });
});
