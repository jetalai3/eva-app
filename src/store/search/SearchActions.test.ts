import { loadCategoryItems } from "./SearchActions";
import { FETCH_SEARCH_REQUEST, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_FAILURE } from "./models/actions";
import { SEARCH_OPTIONS } from "../../common/constants";

const selectedCategory = SEARCH_OPTIONS[0];
const searchText = "test";
const ID = 99010573;
const IDS = { [selectedCategory.value]: [ID] };

const RESULT = {
    id: ID,
    name: "Beta Tested Ur Gf",
};


describe("Test boundRequestResults", () => {
    it("correct fetch", async () => {
        const dispatch = jest.fn();
        const requestFactions = loadCategoryItems(selectedCategory, searchText);
        global.fetch = jest.fn()
            .mockResolvedValueOnce({ json: () => IDS, ok: true })
            .mockResolvedValueOnce({ json: () => RESULT, ok: true });

        await requestFactions(dispatch);
        expect(dispatch.mock.calls[0][0].type).toEqual(FETCH_SEARCH_REQUEST)
        expect(dispatch.mock.calls[1][0].type).toEqual(FETCH_SEARCH_SUCCESS)
        expect(dispatch.mock.calls[1][0].searchResults).toEqual([{
            name: RESULT.name,
            id: ID
        }]);
    });

    it("error", async () => {
        const dispatch = jest.fn();
        const requestFactions = loadCategoryItems(selectedCategory, searchText);
        global.fetch = jest.fn(() => {
            return Promise.reject();
        });
        await requestFactions(dispatch);
        expect(dispatch.mock.calls[1][0].type).toEqual(FETCH_SEARCH_FAILURE);
    });
});
