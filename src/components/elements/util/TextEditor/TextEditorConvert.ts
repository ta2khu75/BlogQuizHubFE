
import { Descendant, Text } from 'slate'
import escapeHtml from 'escape-html'
export const serializeToHtml = (node: Descendant): string => {
    if (Text.isText(node)) {
        let string = escapeHtml(node.text);

        if (node.bold) string = `<strong>${string}</strong>`;
        if (node.italic) string = `<em>${string}</em>`;
        if (node.underline) string = `<u>${string}</u>`;
        if (node.strikethrough) string = `<del>${string}</del>`;
        if (node.code) string = `<code>${string}</code>`;
        if (node.highlight) string = `<mark>${string}</mark>`;
        if (node.superscript) string = `<sup>${string}</sup>`;
        if (node.subscript) string = `<sub>${string}</sub>`;

        return string;
    }

    const children = node.children?.map(n => serializeToHtml(n)).join("") || "";

    switch (node.type) {
        case "block-quote":
            return `<blockquote>${children}</blockquote>`;
        case "numbered-list":
            return `<ol>${children}</ol>`;
        case "bulleted-list":
            return `<ul>${children}</ul>`;
        case "list-item":
            return `<li>${children}</li>`;
        case "h1":
            return `<h1>${children}</h1>`;
        case "h2":
            return `<h2>${children}</h2>`;
        case "h3":
            return `<h3>${children}</h3>`;
        case "h4":
            return `<h4>${children}</h4>`;
        case "h5":
            return `<h5>${children}</h5>`;
        case "h6":
            return `<h6>${children}</h6>`;
        case "link":
            return `<a href="${escapeHtml(node.url)}" target="_blank">${children}</a>`;
        case "image":
            return `<img src="${escapeHtml(node.url)}" alt="" />`;
        case "paragraph":
        default:
            return `<p>${children}</p>`;
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const serializeToHtml = (node: any) => {
//     if (Text.isText(node)) {
//         let string = escapeHtml(node.text)
//         if (node.bold) {
//             string = `<strong>${string}</strong>`
//         }
//         return string
//     }

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const children = node.children.map((n: any) => serializeToHtml(n)).join('')

//     switch (node.type) {
//         case 'quote':
//             return `<blockquote><p>${children}</p></blockquote>`
//         case 'paragraph':
//             return `<p>${children}</p>`
//         case 'link':
//             return `<a href="${escapeHtml(node.url)}">${children}</a>`
//         default:
//             return children
//     }
// }