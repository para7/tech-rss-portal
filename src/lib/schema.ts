import { z } from 'zod';

// RSS形式のアイテムスキーマ
const RssItemSchema = z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.string(),
	link: z.string(),
	guid: z.string(),
	category: z.string().or(z.array(z.string())).optional(),
	source: z.string().optional()
});

// RSS形式のチャンネルスキーマ
const RssChannelSchema = z.object({
	title: z.string(),
	description: z.string(),
	link: z.string(),
	'atom:link': z.string().optional(),
	pubDate: z.string().optional(),
	lastBuildDate: z.string().optional(),
	generator: z.string().optional(),
	item: z.array(RssItemSchema)
});

// RSS形式のルートスキーマ
const RssSchema = z.object({
	'?xml': z.string().optional(),
	rss: z.object({
		channel: RssChannelSchema
	})
});

// Atom形式の著者スキーマ
const AtomAuthorSchema = z.object({
	name: z.string()
});

// Atom形式のエントリースキーマ
const AtomEntrySchema = z.object({
	title: z.string(),
	link: z.string().or(z.array(z.string())),
	id: z.string(),
	published: z.string().optional(),
	updated: z.string(),
	summary: z.string().optional(),
	author: AtomAuthorSchema.optional(),
	category: z.string().or(z.array(z.string())).optional(),
	content: z.string().optional()
});

// Atom形式のフィードスキーマ
const AtomFeedSchema = z.object({
	title: z.string(),
	link: z.string().or(z.array(z.string())),
	id: z.string(),
	updated: z.string(),
	generator: z.string().optional(),
	entry: z.array(AtomEntrySchema)
});

// Atom形式のルートスキーマ
const AtomSchema = z.object({
	'?xml': z.string().optional(),
	feed: AtomFeedSchema
});

// 両方のフォーマットに対応する統合スキーマ
const FeedSchema = z.union([RssSchema, AtomSchema]);

// 標準化されたフィードアイテムの型
export const NormalizedFeedItemSchema = z.object({
	title: z.string(),
	description: z.string(),
	link: z.string(),
	pubDate: z.string(),
	categories: z.array(z.string()).optional(),
	source: z.string().optional()
});

export type RssItem = z.infer<typeof RssItemSchema>;
export type AtomEntry = z.infer<typeof AtomEntrySchema>;
export type NormalizedFeedItem = z.infer<typeof NormalizedFeedItemSchema>;
export type Feed = z.infer<typeof FeedSchema>;

// フィードデータを標準化する関数
export function normalizeFeedItems(feed: Feed): (NormalizedFeedItem & { blogTitle: string })[] {
	if ('rss' in feed) {
		// RSS形式の場合
		return feed.rss.channel.item.map((item) => ({
			title: item.title,
			description: item.description,
			link: item.link,
			pubDate: item.pubDate,
			categories: item.category
				? Array.isArray(item.category)
					? item.category
					: [item.category]
				: undefined,
			source: item.source,
			blogTitle: feed.rss.channel.title
		}));
	} else if ('feed' in feed) {
		// Atom形式の場合
		return feed.feed.entry.map((entry) => ({
			title: entry.title,
			description: entry.summary || entry.content || '',
			link: Array.isArray(entry.link) ? entry.link[0] : entry.link,
			pubDate: entry.published || entry.updated,
			categories: entry.category
				? Array.isArray(entry.category)
					? entry.category
					: [entry.category]
				: undefined,
			source: entry.author?.name,
			blogTitle: feed.feed.title
		}));
	}

	return [];
}

export { RssSchema, AtomSchema, FeedSchema };
