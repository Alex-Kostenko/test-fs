import { render } from "@testing-library/react";
import { useLocation } from "react-router-dom";
import Loader from ".";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => jest.fn(),
  useLocation: jest.fn(),
}));

describe("Loader", () => {
  it("should render skeleton element", () => {
    const location = {
      pathname: "/film/1",
    };

    (useLocation as any).mockReturnValue(location);

    const { container } = render(<Loader />);

    const statusElement = container.querySelector(".ant-skeleton-content");

    expect(statusElement).toBeInTheDocument();
  });
});
