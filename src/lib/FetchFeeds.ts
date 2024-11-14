import { dev } from '$app/environment';
import { feedTargets } from '$lib/feedTargets';
import Parser from 'rss-parser';

type CacheType = {
	timestamp: Date;
	feeds: Parser.Output<{
		[key: string]: unknown;
	}>[];
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
	if (feedCache) {
		return feedCache;
	}

	const parser = new Parser({});

	// まとめてフェッチ
	const feeds = await Promise.all(feedTargets.map((url) => parser.parseURL(url)));

	const data = { feeds, timestamp: new Date() };

	if (dev) {
		// キャッシュを更新
		feedCache = data;
	}

	return data;
};
