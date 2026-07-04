import React from "react";
import { render } from "@testing-library/react";
import VolumeControls from "../volume_controls";

describe("VolumeControls", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("removes its document listeners on unmount", () => {
    const addSpy = jest.spyOn(document, "addEventListener");
    const removeSpy = jest.spyOn(document, "removeEventListener");

    const { unmount } = render(<VolumeControls />);

    const added = addSpy.mock.calls.filter(([type]) =>
      ["mouseup", "mousemove"].includes(type)
    );
    expect(added.map(([type]) => type).sort()).toEqual(["mousemove", "mouseup"]);

    unmount();

    // The exact same handler references must be removed.
    added.forEach(([type, handler]) => {
      expect(removeSpy).toHaveBeenCalledWith(type, handler);
    });
  });

  test("mounting and unmounting twice does not accumulate listeners", () => {
    const addSpy = jest.spyOn(document, "addEventListener");
    const removeSpy = jest.spyOn(document, "removeEventListener");

    const countDocListeners = (spy) =>
      spy.mock.calls.filter(([type]) => ["mouseup", "mousemove"].includes(type))
        .length;

    const first = render(<VolumeControls />);
    first.unmount();
    const second = render(<VolumeControls />);
    second.unmount();

    expect(countDocListeners(addSpy)).toBe(4);
    expect(countDocListeners(removeSpy)).toBe(4);
  });
});
