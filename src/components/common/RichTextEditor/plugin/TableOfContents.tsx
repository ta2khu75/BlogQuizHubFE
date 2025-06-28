import { useTableOfContents } from "@/components/common/RichTextEditor/plugin/useTableOfContents";

const TableOfContents = () => {
  const headings = useTableOfContents();

  return (
    <nav className="w-64 text-sm max-h-[80vh] overflow-y-auto pr-2">
      <ul className="space-y-1">
        {(() => {
          const h2Counter = { current: 0 };
          const h3Counter = { current: 0 };
          const h4Counter = { current: 0 };

          return headings.map((item) => {
            const level = Number(item.tag?.replace("h", "")) || 2;
            let numbering = "";

            if (level === 2) {
              h2Counter.current += 1;
              h3Counter.current = 0;
              h4Counter.current = 0;
              numbering = `${h2Counter.current}`;
            } else if (level === 3) {
              h3Counter.current += 1;
              h4Counter.current = 0;
              numbering = `${h2Counter.current}.${h3Counter.current}`;
            } else if (level === 4) {
              h4Counter.current += 1;
              numbering = `${h2Counter.current}.${h3Counter.current}.${h4Counter.current}`;
            }

            return (
              <li key={item.id} className="list-none">
                <a
                  className="flex flex-wrap items-start gap-2 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(item.id);
                    if (el)
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  style={{
                    marginLeft: `${(level - 2) * 0.75}rem`,
                  }}
                >
                  <span className="text-xs text-muted-foreground font-mono w-8 text-right shrink-0">
                    {numbering}
                  </span>
                  <span className="text-sm text-primary break-words">
                    {item.text}
                  </span>
                </a>
              </li>
            );
          });
        })()}
      </ul>
    </nav>
  );
};
export default TableOfContents;
