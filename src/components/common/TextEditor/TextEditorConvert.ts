
import { Descendant, Text } from 'slate'
import escapeHtml from 'escape-html'
export const serializeToHtml = (node: Descendant): string => {
    if (Text.isText(node)) {
        const text = escapeHtml(node.text);
        let className = "";
        if (node.bold) className = "font-bold";
        else if (node.italic) className = "italic";
        else if (node.underline) className = "underline";
        else if (node.strikethrough) className = "line-through";
        else if (node.code) className = "text-black p-1 text-sm font-mono bg-gray-200";
        else if (node.highlight) className = "text-black p-1 bg-yellow-300 border border-yellow-600";
        return `<span class="${className}">${text}</span>`;
    }

    const children = node.children?.map(n => serializeToHtml(n)).join("") || "";

    switch (node.type) {
        case "block-quote":
            return `<blockquote class="pl-3 border-l-4 text-gray-600 dark:text-gray-400 border-gray-300 bg-gray-100 dark:border-gray-500 dark:bg-gray-800">${children}</blockquote>`;
        case "numbered-list":
            return `<ol class="list-decimal">${children}</ol>`;
        case "bulleted-list":
            return `<ul class="list-disc">${children}</ul>`;
        case "list-item":
            return `<li>${children}</li>`;
        case "h1":
            return `<h1 class="text-6xl">${children}</h1>`;
        case "h2":
            return `<h2 class="text-5xl">${children}</h2>`;
        case "h3":
            return `<h3 class="text-4xl">${children}</h3>`;
        case "h4":
            return `<h4 class="text-3xl">${children}</h4>`;
        case "h5":
            return `<h5 class="text-2xl" >${children}</h5>`;
        case "h6":
            return `<h6 class="text-xl">${children}</h6>`;
        case "link":
            return `<a href="${escapeHtml(node.url)}" target="_blank">${children}</a>`;
        case "image":
            return `<img src="${escapeHtml(node.url)}" alt="" />`;
        case "paragraph":
        default:
            return `<p>${children}</p>`;
    }
};