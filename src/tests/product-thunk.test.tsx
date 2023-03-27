import { fetchProduct } from "../slices/product-slice"
import axios from "axios";

jest.mock('axios', () => {
  return {
    get: jest.fn()
  };
});
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("productThunk", () => {
  it("should fetchProduct with resolved response", async () => {
    const mockProducts = [{
        id: 1,
        preview: "preview",
        title: "title",
        price: 4999,
        availability: true,
        images: undefined,
        subtitle: undefined,
        description: undefined,
        colors: undefined,
        sizes: undefined,
        stickerNumbers: [1, 2],
      }];

      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(mockProducts)

      const dispatch = jest.fn();
      const thunk = fetchProduct(1);
      await thunk(dispatch, ()=>({}), ()=>({}))
      const {calls} = dispatch.mock
      expect(calls).toHaveLength(2)
      const [start, end] = calls;
      expect(start[0].type).toBe("product/pending")
      expect(end[0].type).toBe("product/fulfilled")
      expect(end[0].payload).toBe(mockProducts)

  });
  it("should fetchProduct with rejected response", async () => {
    const err = new Error('Wrong inputs passed in');
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(err)
      const dispatch = jest.fn();
      const thunk = fetchProduct(1);
      await thunk(dispatch, ()=>({}), ()=>({}))
      const {calls} = dispatch.mock
      expect(calls).toHaveLength(2)
      const [start, end] = calls;
      expect(start[0].type).toBe("product/pending")
      expect(end[0].type).toBe("product/rejected")
      expect(end[0].error.message).toBe("Can't axios");
  });
});
