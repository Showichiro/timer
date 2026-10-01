import { atom } from "jotai";
import { render, screen, userEvent } from "../test/test-utils";
import { CardTitle } from "./CardTitle";
import { CountDownCardBody } from "./CountDownCardBody";

describe("native timer controls", () => {
  it("opens time editing with Enter and does not invoke disabled actions", async () => {
    const edit = vi.fn();
    const pause = vi.fn();
    render(
      <CountDownCardBody
        currentValues={{ hours: 0, minutes: 1, seconds: 2 }}
        defaultValues={{ hours: 0, minutes: 1, seconds: 2 }}
        isExpired={false}
        isEditing={false}
        isVisible:start
        isVisible:resume={false}
        disabled:start={false}
        disabled:resume
        disabled:pause
        disabled:reset
        onClick:count={edit}
        onClick:start={vi.fn()}
        onClick:resume={vi.fn()}
        onClick:pause={pause}
        onClick:reset={vi.fn()}
        onClick:editCancel={vi.fn()}
        onClick:editConfirm={vi.fn()}
      />,
    );
    screen.getByRole("button", { name: "timer.action.edit" }).focus();
    await userEvent.keyboard("{Enter}");
    expect(edit).toHaveBeenCalledOnce();
    await userEvent.click(
      screen.getByRole("button", { name: "timer.action.pause" }),
    );
    expect(pause).not.toHaveBeenCalled();
  });

  it("keeps the delete action accessible by name and keyboard", async () => {
    const remove = vi.fn();
    render(<CardTitle titleAtom={atom("tea")} onClick:deleteButton={remove} />);
    screen.getByRole("button", { name: "delete timer" }).focus();
    await userEvent.keyboard(" ");
    expect(remove).toHaveBeenCalledOnce();
  });
});
