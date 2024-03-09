export const parseTextToJSX = (text: string, links?: string[]) => {
  const splitText = text.split("<link>");
  let linkIdx = 0;
  const pText = splitText.map((t, index) => {
    if (index % 2 != 0) {
      const link = links?.[linkIdx];

      linkIdx += 1;

      return (
        <a
          key={t}
          className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
          href={link}
          target="_blank"
        >
          {t}
        </a>
      );
    }

    return t;
  });

  return pText;
};
