import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content');

export async function getPostData() {
  const fullPath = path.join(postsDirectory, `about.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(fileContents);
  const contentHtml = processedContent.toString();

  return contentHtml
};
