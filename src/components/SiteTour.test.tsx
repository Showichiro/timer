import { render } from "../test/test-utils";
import { SiteTour } from "./SiteTour";

const { joyride } = vi.hoisted(() => ({ joyride: vi.fn(() => null) }));
vi.mock("react-joyride", () => ({ Joyride: joyride }));

it("starts the first-visit tour explicitly with progress, skip, and all existing targets", () => {
  render(<SiteTour />);
  expect(joyride).toHaveBeenCalledWith(
    expect.objectContaining({
      run: true,
      continuous: true,
      scrollToFirstStep: true,
      options: {
        showProgress: true,
        buttons: ["back", "close", "primary", "skip"],
      },
      steps: expect.arrayContaining(
        [
          "body",
          ".timer-action",
          ".timer-title",
          ".timer-count",
          ".timer-delete",
          ".timer-add",
          ".timer-theme",
        ].map((target) => expect.objectContaining({ target })),
      ),
    }),
    undefined,
  );
});
