import React from "react";
import renderer from "react-test-renderer";
import Home from "../../pages";

it("renders homepage unchanged", () => {
  const allPostsData = [{ id: 1, date: "27-11-2021", title: "all is well" }];
  const tree = renderer.create(<Home allPostsData={allPostsData} />).toJSON();
  expect(tree).toMatchSnapshot();
});
