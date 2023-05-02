import { render, screen } from "@testing-library/react";
import Layout from ".";
import { useLocation } from "react-router-dom";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useLocation: jest.fn(),
}));

describe("Layout", () => {
  it("renders its children", () => {
    const location = {
      pathname: "/film/1",
    };
    (useLocation as any).mockReturnValue(location);
    render(
      <Layout>
        <div>Child Element</div>
      </Layout>
    );
    expect(screen.getByText("Child Element")).toBeInTheDocument();
  });

  it('displays a "Go Back" button when not on the home or characters page', () => {
    const location = {
      pathname: "/film/1",
      search: "",
      hash: "",
      state: null,
    };
    (useLocation as any).mockReturnValue(location);

    render(
      <Layout>
        <div>Child Element</div>
      </Layout>
    );

    expect(screen.getByText("Go Back")).toBeInTheDocument();

    jest.clearAllMocks();
  });

  it('does not display a "Go Back" button on the home or characters page', () => {
    const location = {
      pathname: "/",
    };
    (useLocation as any).mockReturnValue(location);

    render(
      <Layout>
        <div>Child Element</div>
      </Layout>
    );

    expect(screen.queryByText("Go Back")).not.toBeInTheDocument();
    jest.clearAllMocks();
  });
});
