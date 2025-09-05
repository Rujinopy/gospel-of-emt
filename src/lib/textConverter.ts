import { slug } from "github-slugger";
import { marked } from "marked";

marked.use({
  mangle: false,
  headerIds: false,
});

// slugify
export const slugify = (content: string) => {
  return slug(content);
};

// markdownify
export const markdownify = (content: string, div?: boolean) => {
  return div ? marked.parse(content) : marked.parseInline(content);
};

// hyphen to space, uppercase only first letter in each word
export const upperHumanize = (content: string) => {
  return content
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase());
};

export const humanize = (content: string) => {
  return content
    .replace(/-/g, " ")
    .replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase());
};

export const mapCategoryName = (category: string): string => {
  const arcDescriptions: Record<string, string> = {
    "arc-7": "Arc 7: ดินแดนแห่งหมาป่า",
    "arc-8": "Arc 8: วินเซนต์ วอลลาเคีย", 
    "arc-9": "Arc 9: แสงแห่งดวงดาราไร้นาม",
    "ayamatsu": "Ayamatsu: รูทเย่อหยิ่ง",
    "mimagau": "Mimagau: รูทสลับเพศ",
    "oboberu": "Oboberu: รูทโทสะ",
    "ex5": "นิยายสปินออฟ EX5 \"ตำนานเจ้าหญิงสีชาด\"",
    "tsugihagu": "Tsugihagu: รูทตะกละ",
  };
  return arcDescriptions[category] || upperHumanize(category);
}

// hyphen to space, lowercase all letters
export const lowerHumanize = (content: string) => {
  return content
    .toLowerCase()
    .replace(/-/g, " ");
};

// plainify
export const plainify = (content: string) => {
  const parseMarkdown = marked.parse(content);
  const filterBrackets = parseMarkdown.replace(/<\/?[^>]+(>|$)/gm, "");
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, "");
  const stripHTML = htmlEntityDecoder(filterSpaces);
  return stripHTML;
};

// strip entities for plainify
const htmlEntityDecoder = (htmlWithEntities: string) => {
  let entityList: { [key: string]: string } = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
  };
  let htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity: string): string => {
      return entityList[entity];
    },
  );
  return htmlWithoutEntities;
};
