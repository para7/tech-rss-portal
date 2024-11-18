<script>
	import { FormatDateJP, FormatDateYMH } from '$lib/intl';

	export let data;
</script>

<h1>技術ブログ ウォッチ フィード集</h1>
<div>最終更新: {FormatDateJP(data.timestamp)}</div>
<ul>
	{#each data.items as item}
		<li class="panel">
			<div class="title">
				<h2>{item.blogTitle}</h2>
				<div>{FormatDateYMH(item.timestamp)}</div>
			</div>
			<a href={item.link} class="link" target="_blank">
				{item.title}
			</a>
			<p class="snippet">{item.contentSnippet?.slice(0, 140)}</p>
		</li>
	{/each}
</ul>

<style>
	.panel {
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 10px;
		margin: 10px 0;
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
