//Let's see how good it is at testing itself

import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "./index";

describe("Home component", () => {
  test("renders welcome message", () => {
    render(<Home />, { wrapper: MemoryRouter });
    expect(screen.getByText("Welcome to ReactBot")).toBeInTheDocument();
  });

  test("renders paragraph with project description", () => {
    render(<Home />, { wrapper: MemoryRouter });
    expect(
      screen.getByText(
        "This project is a frontend for my BootBot Rest API project that utilises the OpenAI API service. Not sure exactly what direction this is gonna take yet, but we're gonna see what we can do with ChatGPT"
      )
    ).toBeInTheDocument();
  });

  test("renders two links", () => {
    render(<Home />, { wrapper: MemoryRouter });
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  test("renders link to Chat page", () => {
    render(<Home />, { wrapper: MemoryRouter });
    expect(screen.getByText("Chat")).toHaveAttribute("href", "/chat");
  });

  test("renders link to CSS Generator page", () => {
    render(<Home />, { wrapper: MemoryRouter });
    expect(screen.getByText("CSS Generator")).toHaveAttribute(
      "href",
      "/generate"
    );
  });
});
