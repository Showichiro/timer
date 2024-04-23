import { render, screen, userEvent } from "../test/test-utils";
import { Header } from "./Header";

describe("Header", () => {
  it("should call addTimer when user click countdown button", async () => {
    const mock = vi.fn();
    render(<Header addTimer={mock} />);
    await userEvent.click(screen.getByText("header.menu.timer.countdown"));
    expect(mock).toHaveBeenCalledWith("countdown");
  });

  it("should call addTimer when user click stopwatch button", async () => {
    const mock = vi.fn();
    render(<Header addTimer={mock} />);
    await userEvent.click(screen.getByText("header.menu.timer.stopwatch"));
    expect(mock).toHaveBeenCalledWith("stopwatch");
  });
});
