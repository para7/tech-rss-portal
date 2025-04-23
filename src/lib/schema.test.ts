import { expect, test } from 'vitest';

import json0 from './feedsample/0.json';
import json1 from './feedsample/1.json';
import json2 from './feedsample/2.json';
import json3 from './feedsample/3.json';
import json4 from './feedsample/4.json';
import json5 from './feedsample/5.json';
import json6 from './feedsample/6.json';
import { FeedSchema } from './schema';

const check = (json: unknown) => {
	const result = FeedSchema.safeParse(json);

	if (!result.success) {
		console.log(result.error);
	}
	expect(result.success).toBe(true);
};

test('feed0', () => {
	check(json0);
});

test('feed1', () => {
	check(json1);
});

test('feed2', () => {
	check(json2);
});

test('feed3', () => {
	check(json3);
});

test('feed4', () => {
	check(json4);
});

test('feed5', () => {
	check(json5);
});

test('feed6', () => {
	check(json6);
});
