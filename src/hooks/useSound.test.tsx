import { act, render, screen } from "../test/test-utils";
import { useSound } from "./useSound";

const Sound = () => {
  const { audio, control } = useSound("/timer/clickSound.mp3");
  return (
    <>
      {audio}
      <button type="button" onClick={control.play}>
        play
      </button>
    </>
  );
};

describe("useSound", () => {
  afterEach(() => vi.restoreAllMocks());

  it("restarts the native sound on repeated clicks", () => {
    const play = vi
      .spyOn(HTMLMediaElement.prototype, "play")
      .mockResolvedValue();
    const { container } = render(<Sound />);
    const audio = container.querySelector("audio") as HTMLAudioElement;
    audio.currentTime = 2;
    act(() => screen.getByRole("button").click());
    expect(audio.currentTime).toBe(0);
    expect(play).toHaveBeenCalledOnce();
    audio.currentTime = 1;
    act(() => screen.getByRole("button").click());
    expect(audio.currentTime).toBe(0);
    expect(play).toHaveBeenCalledTimes(2);
  });

  it("handles rejected browser playback without an unhandled rejection", async () => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockRejectedValue(
      new Error("blocked"),
    );
    render(<Sound />);
    await act(async () => screen.getByRole("button").click());
  });
});
