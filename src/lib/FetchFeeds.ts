import { dev } from '$app/environment';
import { feedTargets } from '$lib/feedTargets';
import { FeedSchema, type Feed } from './schema';
import { xmlToJson } from './xml-to-json';

type CacheType = {
	timestamp: Date;
	feeds: Feed[];
};

let feedCache: CacheType;

/**
 * フィードを取得する
 *
 * 開発中は相手サーバーに負荷をかけないよう、キャッシュする
 *
 * @returns 全フィードと、取得時間
 */
export const FetchFeeds = async (): Promise<CacheType> => {
	if (feedCache && !dev) {
		return feedCache;
	}

	// まとめてフェッチ
	const feeds = await Promise.all(
		feedTargets.map(async (url) => {
			const response = await fetch(url);
			const text = await response.text();
			return FeedSchema.parse(xmlToJson(text));
		})
	);

	const data = { feeds, timestamp: new Date() };

	if (dev) {
		// キャッシュを更新
		feedCache = data;
	}

	return data;
};
