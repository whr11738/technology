// HTML 与 Markdown 互相转换
// npm install showdown
import showdown from 'showdown';

// Markdown 转 HTML
export const MDtoHTML = (MD) => new showdown.Converter().makeHtml(MD);

// HTML 转 Markdown
export const HTMLtoMD = (HTML) => new showdown.Converter().makeMarkdown(HTML);
