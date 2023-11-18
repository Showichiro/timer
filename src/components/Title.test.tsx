import { fireEvent, render, screen } from "../test/test-utils";
import Title from "./Title";

describe("Title", () => {
  it("should render input", () => {
    render(<Title defaultTitle="timer" onEditTitle={vi.fn()} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("timer");
    expect(screen.getByRole("textbox")).toHaveClass("timer-title");
  });

  it("should render default title", () => {
    render(<Title onEditTitle={vi.fn()} />);
    expect(screen.getByRole("textbox")).toHaveValue("timer.defaultTitle");
  });

  it("should call onEditTitle when input is blured", () => {
    const mock = vi.fn();
    render(<Title defaultTitle="timer" onEditTitle={mock} />);
    screen.getByRole("textbox").focus();
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "new title" },
    });
    screen.getByRole("textbox").blur();
    expect(mock).toHaveBeenCalledWith("new title");
  });
});
