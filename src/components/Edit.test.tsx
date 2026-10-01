import { render, screen, userEvent } from "../test/test-utils";
import { Edit } from "./Edit";

describe("Edit", () => {
  it("should render select box", () => {
    render(
      <Edit
        defaultValues={{ hours: 0, minutes: 0, seconds: 0 }}
        onClick:cancel={vi.fn()}
        onClick:confirm={vi.fn()}
      />,
    );
    expect(screen.getAllByRole("combobox")).toHaveLength(3);
  });

  it("should call onClick:cancel when user click cancel button", async () => {
    const mock = vi.fn();
    render(
      <Edit
        defaultValues={{ hours: 0, minutes: 0, seconds: 0 }}
        onClick:cancel={mock}
        onClick:confirm={vi.fn()}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", { name: "timer.action.cancel" }),
    );
    expect(mock).toHaveBeenCalled();
  });

  it("should call onClick:confirm when user click confirm button", async () => {
    const mock = vi.fn();
    render(
      <Edit
        defaultValues={{ hours: 0, minutes: 0, seconds: 0 }}
        onClick:cancel={vi.fn()}
        onClick:confirm={mock}
      />,
    );
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: "timer.unit.hours" }),
      "1",
    );
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: "timer.unit.minutes" }),
      "2",
    );
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: "timer.unit.seconds" }),
      "3",
    );
    await userEvent.click(
      screen.getByRole("button", { name: "timer.action.confirm" }),
    );
    expect(mock).toHaveBeenCalledWith(
      { hours: 1, minutes: 2, seconds: 3 },
      expect.anything(),
    );
  });
});
