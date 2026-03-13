// 新闻来源中英文映射
export const sourceNameMap = {
  // 英文 -> 中文
  'BBC News': 'BBC新闻',
  'BBC': 'BBC新闻',
  'CNN': 'CNN',
  'Fox News': '福克斯新闻',
  'Reuters': '路透社',
  'AP News': '美联社',
  'NBC News': 'NBC新闻',
  'ABC News': 'ABC新闻',
  'CBS News': 'CBS新闻',
  'The New York Times': '纽约时报',
  'The Guardian': '卫报',
  'The Washington Post': '华盛顿邮报',
  'Wall Street Journal': '华尔街日报',
  'Financial Times': '金融时报',
  'CNBC': 'CNBC财经',
  'Bloomberg': '彭博社',
  'TechCrunch': '科技媒体',
  'The Verge': 'The Verge',
  'Wired': '连线杂志',
  'Ars Technica': 'Ars Technica',
  'Eurogamer.net': 'Eurogamer游戏',
  'TechRadar': 'TechRadar科技',
  'CNET': 'CNET科技',
  'SciTechDaily': '科学日报',
  'Daily Mail': '每日邮报',
  'Eurogamer': 'Eurogamer游戏',
  'Meta Quest': 'Meta Quest',
  // 中文保持不变
  '新华网': '新华网',
  '人民网': '人民网',
  '新浪新闻': '新浪新闻',
  '网易新闻': '网易新闻',
  '腾讯新闻': '腾讯新闻',
  '36kr': '36氪',
  '彭博社': '彭博社',
  '默认': '默认'
}

/**
 * 翻译来源名称为中文
 * @param {string} source 英文或中文来源名
 * @returns {string} 翻译后的中文名称
 */
export function translateSource(source) {
  if (!source) return '未知来源'
  return sourceNameMap[source] || source
}
