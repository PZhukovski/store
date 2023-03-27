import { fetchMadeInAlfa } from "../slices/made-in-alfa-slice";
import axios from "axios";

jest.mock('axios', () => {
  return {
    get: jest.fn()
  };
});
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("madeInAlfaThunk", () => {
  it("should fecthMadeinAlfa with resolved response", async () => {
    const mockProducts = [{
        id: 1,
        preview: "preview",
        title: "title",
        price: 4999,
        availability: true,
      }];

      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(mockProducts)

      const dispatch = jest.fn();
      const thunk = fetchMadeInAlfa();
      await thunk(dispatch, ()=>({}), ()=>({}))
      const {calls} = dispatch.mock
      expect(calls).toHaveLength(2)
      const [start, end] = calls;
      expect(start[0].type).toBe("made_in_alfa/pending")
      expect(end[0].type).toBe("made_in_alfa/fulfilled")
      expect(end[0].payload).toBe(mockProducts)

  });
  it("should fecthMadeinAlfa with rejected response", async () => {
    const err = new Error('Wrong inputs passed in');
      (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(err)

      const dispatch = jest.fn();
      const thunk = fetchMadeInAlfa();
      await thunk(dispatch, ()=>({}), ()=>({}))
      const {calls} = dispatch.mock
      expect(calls).toHaveLength(2)
      const [start, end] = calls;
      expect(start[0].type).toBe("made_in_alfa/pending")
      expect(end[0].type).toBe("made_in_alfa/rejected")
      expect(end[0].error.message).toBe("Can't axios");
  });
});
