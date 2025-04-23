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

	// const url = feedTargets[Math.floor(Math.random() * feedTargets.length)];

	// const testFeed = await (await fetch(url)).text();

	// console.log(xmlToJson(testFeed));
	// // console.log(xmlToJson(testFeed.entry[0]));

	// console.log(url);
	// const parsed = FeedSchema.parse(xmlToJson(testFeed));

	// console.log(parsed);

	// // if ('rss' in parsed) {
	// // 	console.log(parsed.rss.channel);
	// // } else {
	// // 	console.log(parsed.channel);
	// // }

	// return {
	// 	feeds: [],
	// 	timestamp: new Date()
	// };

	// まとめてフェッチ
	const feeds = await Promise.all(
		feedTargets.map(async (url) => {
			const text = await (await fetch(url)).text();
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
