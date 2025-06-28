export const getButtonVariant = (value?: boolean) => {
  if (value) {
    return "default";
  }
  return "outline";
};
export function isValidUrl(url: string): boolean {
  try {
    new URL(url); // nếu không hợp lệ sẽ throw
    return true;
  } catch {
    return false;
  }
}
// export function assignHeadingIdsFromToc(editor: LexicalEditor) {
//   editor.update(() => {
//     const root = $getRoot();
//     const h2Counter = { current: 0 };
//     const h3Counter = { current: 0 };
//     const h4Counter = { current: 0 };

//     const children = root.getChildren();

//     for (const node of children) {
//       if (!$isHeadingNode(node)) continue;

//       const tag = (node as ElementNode).getTag?.() as string;

//       let id = "";

//       if (tag === "h2") {
//         h2Counter.current += 1;
//         h3Counter.current = 0;
//         h4Counter.current = 0;
//         id = `heading-${h2Counter.current}`;
//       } else if (tag === "h3") {
//         h3Counter.current += 1;
//         h4Counter.current = 0;
//         id = `heading-${h2Counter.current}.${h3Counter.current}`;
//       } else if (tag === "h4") {
//         h4Counter.current += 1;
//         id = `heading-${h2Counter.current}.${h3Counter.current}.${h4Counter.current}`;
//       }

//       if (id) {
//         (node as ElementNode).setAttribute("id", id);
//       }
//     }
//   });
// }

// export function autoNumberHeadings(editor) {
//   editor.update(() => {
//     const root = $getRoot();
//     const h2Counter = { current: 0 };
//     const h3Counter = { current: 0 };
//     const h4Counter = { current: 0 };

//     const children = root.getChildren();

//     for (const node of children) {
//       if (!$isElementNode(node) || !$isHeadingNode(node)) continue;

//       const tag = node.getTag?.() as string;
//       let numbering = "";

//       if (tag === "h2") {
//         h2Counter.current += 1;
//         h3Counter.current = 0;
//         h4Counter.current = 0;
//         numbering = `${h2Counter.current}`;
//       } else if (tag === "h3") {
//         h3Counter.current += 1;
//         h4Counter.current = 0;
//         numbering = `${h2Counter.current}.${h3Counter.current}`;
//       } else if (tag === "h4") {
//         h4Counter.current += 1;
//         numbering = `${h2Counter.current}.${h3Counter.current}.${h4Counter.current}`;
//       }

//       if (numbering) {
//         const content = node.getTextContent().replace(/^\d[\d.]*\s+/, "");
//         node.clear(); // Xoá nội dung cũ
//         node.append($createTextNode(`${numbering} ${content}`));
//         node.setAttribute("id", `heading-${numbering}`);
//       }
//     }
//   });
// }
