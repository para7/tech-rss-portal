<script>
	import { FormatDateJP, FormatDateYMH } from '$lib/intl';

	export let data;
</script>

<h1>技術ブログ ウォッチ フィード集</h1>
<div>最終更新: {FormatDateJP(data.timestamp)}</div>
<div class="feed-container">
	{#each data.items as item}
		<div class="panel">
			<div class="title">
				<h2>{item.blogTitle}</h2>
				<div>{FormatDateYMH(item.timestamp)}</div>
			</div>
			<a href={item.link} class="link" target="_blank">
				{item.title}
			</a>
			<p class="snippet">{item.contentSnippet?.slice(0, 140)}</p>
		</div>
	{/each}
</div>

<style>
	.feed-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.panel {
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 10px;
	}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	h2 {
		font-size: 1em;
	}

	.link {
		display: block;
		margin-bottom: 0.5em;
	}

	.snippet {
		font-size: 0.8em;
	}
</style>
