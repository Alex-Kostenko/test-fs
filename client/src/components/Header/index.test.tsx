import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import Header from ".";
import { BrowserRouter } from "react-router-dom";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Header", () => {
  it("should render without errors", () => {
    const { getByRole } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(getByRole("banner")).toBeInTheDocument();
  });

  it("should render menu items with correct label text", () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(container.querySelector('[title="Films"]')).toBeInTheDocument();
    expect(container.querySelector('[title="Characters"]')).toBeInTheDocument();
  });

  it("should navigate to proper route when menu item is clicked", async () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    fireEvent.click(container.querySelector('[title="Films"]')!);

    await act(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
    });

    fireEvent.click(container.querySelector('[title="Characters"]')!);

    await act(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith("/characters");
    });
  });
});
