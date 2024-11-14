import Parser from 'rss-parser';
import type { PageServerLoad } from './$types';
import { FetchFeeds } from '$lib/FetchFeeds';
import { FEED_LENGTH } from '$lib/feedTargets';

/**
 * パースされたRSSフィードを追加のメタデータを含む簡略化された形式に変換します。
 */
const convertFeed = (feed: Parser.Output<unknown>) => {
	return feed.items.slice(0, FEED_LENGTH).map((x) => ({
		...x,
		timestamp: new Date(x.isoDate ?? x.pubDate ?? 0),
		blogTitle: feed.title
	}));
};

export const load: PageServerLoad = async () => {
	// まとめてフェッチ
	const feeds = await FetchFeeds();

	// 変換しつつ整形
	const flatFeeds = feeds.feeds
		.flatMap((x) => convertFeed(x))
		.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

	// setHeaders({
	// 	'Cache-Control': 'max-age=3600'
	// });

	return {
		items: flatFeeds,
		timestamp: feeds.timestamp
	};
};
