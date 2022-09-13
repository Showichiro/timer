import { FC, useCallback, useState } from "react";

const Title: FC = () => {
  const [title, setTitle] = useState("タイマー");
  const handleChangeTitle = useCallback(
    ({ target: { value } }: { target: { value: string } }) => setTitle(value),
    []
  );
  return (
    <input
      className="basis-full text-2xl md:text-3xl lg:text-4xl truncate ..."
      type="text"
      size={6}
      value={title}
      onChange={handleChangeTitle}
      onFocus={(e) => e.target.select()}
    />
  );
};

export default Title;
