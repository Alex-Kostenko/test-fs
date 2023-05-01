import { mount } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../../utils/hooks/index";
import CharacterPage from ".";
import { Col, Divider, Layout, Pagination, Row, Input } from "antd";
import Loader from "../../../components/Loader";
import Card from "../../../components/FilmCard";
// import SearchOutlined from "@ant-design/icons/es/icons/SearchOutlined";

const { Search } = Input;

jest.mock("../../../utils/hooks/index");
jest.mock("../../../api/characterService");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("CharacterPage component", () => {
  const characterData: Character[] = [
    {
      birth_year: "19BBY",
      created: "2014-12-09T13:50:51.644000Z",
      edited: "2014-12-20T21:17:56.891000Z",
      eye_color: "blue",
      films: [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
      ],
      gender: "male",
      hair_color: "blond",
      height: "172",
      homeworld: "https://swapi.dev/api/planets/1/",
      mass: "77",
      name: "Luke Skywalker",
      skin_color: "fair",
      species: [],
      starships: [
        "https://swapi.dev/api/starships/12/",
        "https://swapi.dev/api/starships/22/",
      ],
      url: "https://swapi.dev/api/people/1/",
      vehicles: [
        "https://swapi.dev/api/vehicles/14/",
        "https://swapi.dev/api/vehicles/30/",
      ],
    },
  ];

  beforeEach(() => {
    (useApi as jest.Mock).mockReturnValue({
      data: characterData,
      updateData: jest.fn(),
      isLoading: false,
      updateLoading: jest.fn(),
      page: 1,
      updatePage: jest.fn(),
      count: 1,
      updateCount: jest.fn(),
    });
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Loader when data is not present", async () => {
    // Arrange
    (useApi as jest.Mock).mockReturnValue({
      data: null,
      updateData: jest.fn(),
      isLoading: false,
      updateLoading: jest.fn(),
      page: 1,
      updatePage: jest.fn(),
      count: 0,
      updateCount: jest.fn(),
    });

    // Act
    const wrapper = mount(<CharacterPage />);

    // Assert
    expect(wrapper.find(Loader)).toHaveLength(1);
  });

  it("renders the component correctly when data is present", async () => {
    // Act
    const wrapper = mount(<CharacterPage />);

    // Assert
    expect(wrapper.find(Layout)).toHaveLength(1);
    expect(wrapper.find(Row)).toHaveLength(2);
    expect(wrapper.find(Col)).toHaveLength(1);
    expect(wrapper.find(Search)).toHaveLength(1);
    expect(wrapper.find(Divider)).toHaveLength(2);
    expect(wrapper.find(Pagination)).toHaveLength(1);
    expect(wrapper.find(Card)).toHaveLength(1); // Based on the characterData provided.
  });

  it("sets isLoading to true when loading is true", async () => {
    // Arrange
    (useApi as jest.Mock).mockReturnValue({
      data: null,
      updateData: jest.fn(),
      isLoading: true,
      updateLoading: jest.fn(),
      page: 1,
      updatePage: jest.fn(),
      count: 0,
      updateCount: jest.fn(),
    });

    // Act
    const wrapper = mount(<CharacterPage />);

    // Assert
    expect(wrapper.find(Search).prop("loading")).toBe(true);
  });

  it("sets isLoading to false when loading is false", async () => {
    // Arrange
    (useApi as jest.Mock).mockReturnValue({
      data: null,
      updateData: jest.fn(),
      isLoading: false,
      updateLoading: jest.fn(),
      page: 1,
      updatePage: jest.fn(),
      count: 0,
      updateCount: jest.fn(),
    });

    // Act
    const wrapper = mount(<CharacterPage />);

    // Assert
    expect(wrapper.find(Search).prop("loading")).toBe(false);
  });

  it("calls handleSearch with correct value when user enters text", async () => {
    // Arrange
    const setSearch = jest.fn();
    const value = "test";
    (useApi as jest.Mock).mockReturnValue({
      data: null,
      updateData: jest.fn(),
      isLoading: false,
      updateLoading: jest.fn(),
      page: 1,
      updatePage: jest.fn(),
      count: 0,
      updateCount: jest.fn(),
    });
    const wrapper = mount(<CharacterPage />);
    wrapper.setProps({ setSearch });

    // Act
    wrapper.find(Search).simulate("change", { target: { value } });

    // Assert
    expect(setSearch).toHaveBeenCalledWith(value);
    expect(wrapper.find(Search).prop("value")).toBe(value);
  });

  it("sets isLoading to true when updateLoading is called with true", async () => {
    // Arrange
    const updateLoading = jest.fn();
    (useApi as jest.Mock).mockReturnValue({
      data: null,
      updateData: jest.fn(),
      isLoading: false,
      updateLoading,
      page: 1,
      updatePage: jest.fn(),
      count: 0,
      updateCount: jest.fn(),
    });
    const wrapper = mount(<CharacterPage />);

    // Act
    act(() => {
      updateLoading(true);
    });

    // Assert
    expect(wrapper.find(Search).prop("loading")).toBe(true);
  });

  it("sets isLoading to false when updateLoading is called with false", async () => {
    // Arrange
    const updateLoading = jest.fn();
    (useApi as jest.Mock).mockReturnValue({
      data: null,
      updateData: jest.fn(),
      isLoading: true,
      updateLoading,
      page: 1,
      updatePage: jest.fn(),
      count: 0,
      updateCount: jest.fn(),
    });
    const wrapper = mount(<CharacterPage />);

    // Act
    act(() => {
      updateLoading(false);
    });

    // Assert
    expect(wrapper.find(Search).prop("loading")).toBe(false);
  });

  it("calls updateData with correct data when updateData is called", async () => {
    // Arrange
    const updateData = jest.fn();
    (useApi as jest.Mock).mockReturnValue({
      data: null,
      updateData,
      isLoading: false,
      updateLoading: jest.fn(),
      page: 1,
      updatePage: jest.fn(),
      count: 0,
      updateCount: jest.fn(),
    });
    const wrapper = mount(<CharacterPage />);

    // Act
    act(() => {
      updateData(characterData);
    });

    // Assert
    expect(wrapper.find(Card)).toHaveLength(1);
  });

  it("calls updatePage with correct value when updatePage is called", async () => {
    // Arrange
    const updatePage = jest.fn();
    (useApi as jest.Mock).mockReturnValue({
      data: null,
      updateData: jest.fn(),
      isLoading: false,
      updateLoading: jest.fn(),
      page: 1,
      updatePage,
      count: 0,
      updateCount: jest.fn(),
    });
    const wrapper = mount(<CharacterPage />);
    const newPage = 2;

    // Act
    act(() => {
      wrapper.find(Pagination).prop("onChange")!(newPage, 10);
    });

    // Assert
    expect(updatePage).toHaveBeenCalledWith(newPage);
  });

  it("calls updateCount with correct value when updateCount is called", async () => {
    // Arrange
    const updateCount = jest.fn();
    (useApi as jest.Mock).mockReturnValue({
      data: null,
      updateData: jest.fn(),
      isLoading: false,
      updateLoading: jest.fn(),
      page: 1,
      updatePage: jest.fn(),
      count: 0,
      updateCount,
    });
    const wrapper = mount(<CharacterPage />);
    const newCount = 10;

    // Act
    act(() => {
      updateCount(newCount);
    });

    // Assert
    expect(wrapper.find(Pagination).prop("total")).toBe(newCount);
  });
});
