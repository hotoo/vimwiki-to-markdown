'use strict';

const RE_IMAGE = /\.(?:jpg|png|gif|jpeg)$/;

exports.convertWiki2Markdown = function(wiki) {
  return wiki.replace(/^=\s+(.+?)\s+=$/mg, '# $1')
    .replace(/^==\s+(.+?)\s+==$/mg, '## $1')
    .replace(/^===\s+(.+?)\s+===$/mg, '### $1')
    .replace(/^====\s+(.+?)\s+====$/mg, '#### $1')
    .replace(/^=====\s+(.+?)\s+=====$/mg, '##### $1')
    .replace(/^======\s+(.+?)\s+======$/mg, '###### $1')
    .replace(/\[\[(.+?)\]\]/g, ($0, $1) => {
      const links = $1.split('|');
      const text = links[1] || links[0];
      const link = links[0];
      if (RE_IMAGE.test(link)) {
        return `![${text}](${link})`;
      } else {
        return `[${text}](${link})`;
      }
    })
    .replace(/\[(https?::\/\/[^ ]+)(?: (.+?))?\](?!=\()/g, ($0, $1, $2) => {
      const link = $1;
      const text = $2;
      if (!text) {
        return link;
      }
      if (RE_IMAGE.test(link)) {
        return '![$2]($1)';
      } else {
        return '[$2]($1)';
      }
    })
    .replace(/\{\{\{/g, '```')
    .replace(/\}\}\}/g, '```');
};
