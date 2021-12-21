/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../../pages";

const props = {
  data: [
    {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    },
    {
      userId: 10,
      id: 200,
      title: "ipsam aperiam voluptates qui",
      completed: false,
    },
  ],
  emptyData: [],
  message: "Addon groups fetched successfully.",
};

describe("Home d", () => {
  beforeEach(() => {
    const addonList = props.data;
    global.fetch = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve(addonList) })
      );
    return global;
  });
  it("renders a heading", async () => {
    const allPostsData = [
      { id: 1, completed: false, userId: 1, title: "all is well" },
    ];

    const { container, debug } = render(<Home allPostsData={allPostsData} />);

    // debug(container, 10000);

    const textcontext = await screen.findByText("ipsam aperiam voluptates qui");

    expect(textcontext).toBeInTheDocument();
  });
});
