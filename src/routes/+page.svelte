<script>
	export let data;
</script>

<h1>技術ブログ ウォッチ フィード集</h1>
<div>更新日時: {new Date(data.timestamp).toLocaleString()}</div>
<ul>
	{#each data.items as item}
		<div class="panel">
			<div class="title">
				<h2>{item.blogTitle}</h2>
				<div>{item.timestamp.toISOString().slice(0, 10)}</div>
			</div>
			<a href={item.link} class="link" target="_blank">
				{item.title}
			</a>
			<p class="snippet">{item.description}</p>
		</div>
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
