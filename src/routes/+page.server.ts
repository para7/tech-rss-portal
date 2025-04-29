import type { PageServerLoad } from './$types';
import { FetchFeeds } from '$lib/FetchFeeds';
import { FEED_LENGTH } from '$lib/feedTargets';
import { normalizeFeedItems, type Feed } from '$lib/schema';

// HTMLタグを取り除く関数
function stripHtml(html: string): string {
	return html.replace(/<[^>]*>/g, '');
}

/**
 * パースされたRSSフィードを追加のメタデータを含む簡略化された形式に変換します。
 */
const convertFeed = (feed: Feed) => {
	// return feed.items.slice(0, FEED_LENGTH).map((x) => ({
	const normalized = normalizeFeedItems(feed);

	return normalized.slice(0, FEED_LENGTH).map((x) => {
		const description =
			typeof x.description === 'string'
				? x.description.includes('<') && x.description.includes('>')
					? stripHtml(x.description).slice(0, 200)
					: x.description.slice(0, 200)
				: '';

		return {
			...x,
			// timestamp: new Date(x.isoDate ?? x.pubDate ?? 0),

			timestamp: new Date(x.pubDate ?? 0),
			blogTitle: x.blogTitle,
			description
		};
	});
};

export const load: PageServerLoad = async ({ setHeaders }) => {
	// まとめてフェッチ
	const feeds = await FetchFeeds();

	// 変換しつつ整形
	const flatFeeds = feeds.feeds
		.flatMap((x) => convertFeed(x))
		.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

	// 追加: SWR 用の Cache-Control
	//  - max-age=0         : ブラウザは即座に stale 扱い
	//  - s-maxage=3600     : CDN(共有キャッシュ) では 1 時間新鮮
	setHeaders({
		'Cache-Control': 'public, max-age=3600, s-maxage=3600'
	});

	return {
		items: flatFeeds,
		timestamp: new Date()
	};
};
