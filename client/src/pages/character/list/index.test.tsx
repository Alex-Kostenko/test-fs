import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { characterService } from "../../../api/characterService";
import CharacterPage from ".";

const mockedUsedNavigate = jest.fn();

jest.mock("../../../api/characterService", () => ({
  characterService: {
    getCharacters: jest.fn(),
  },
}));

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => mockedUsedNavigate,
}));

describe("CharacterPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when the API call succeeds", () => {
    beforeEach(() => {
      (characterService.getCharacters as jest.Mock).mockResolvedValueOnce({
        results: [
          { name: "Luke Skywalker", birth_year: "19BBY", url: "/characters/1" },
          { name: "Leia Organa", birth_year: "19BBY", url: "/characters/5" },
        ],
        count: 2,
      });
    });

    it("renders the list of characters", async () => {
      render(<CharacterPage />);
      console.log(screen.debug());
      // Wait for the API call to complete
      await screen.findByText("Luke Skywalker");

      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
      expect(screen.getByText("Leia Organa")).toBeInTheDocument();
    });
  });

  describe("when the API call fails", () => {
    beforeEach(() => {
      (characterService.getCharacters as jest.Mock).mockRejectedValueOnce(
        new Error("Oops")
      );
    });

    it("displays an error message", async () => {
      render(<CharacterPage />);

      await screen.findByText("Error occurred while fetching data");

      expect(
        screen.getByText("Error occurred while fetching data")
      ).toBeInTheDocument();
    });
  });
});
