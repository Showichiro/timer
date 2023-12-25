import { Provider, atom } from "jotai";
import { render, screen, userEvent } from "../test/test-utils";
import Title from "./Title";

describe("Title", () => {
  const titleAtom = atom("timer");
  it("should render input", () => {
    render(
      <Provider>
        <Title titleAtom={titleAtom} />
      </Provider>,
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("timer");
    expect(screen.getByRole("textbox")).toHaveClass("timer-title");
  });

  it("should be edditable", async () => {
    render(
      <Provider>
        <Title titleAtom={titleAtom} />
      </Provider>,
    );
    await userEvent.clear(screen.getByRole("textbox"));
    await userEvent.type(screen.getByRole("textbox"), "new title");
    expect(screen.getByRole("textbox")).toHaveValue("new title");
  });
});
