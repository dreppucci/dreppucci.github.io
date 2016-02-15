---
layout: page
title: Works
permalink: /works/
description: Take a look on what Davide Reppucci has made in these years
---

<section class="page-view work-view" id="works-list">
	<div class="handle main">
		{% assign sorted_works = (site.works | sort: 'date') | reverse %}
		{% for work in sorted_works %}
		<article data-id="{{ work.id }}">

			<div class="content">
				<h1>{{ work.title }}</h1>
				<h2>{{ work.abstract }}</h2>
				<p class="btn"><a href="{{ work.link }}" target="_blank" title="Go on {{ work.link }}" data-id="{{ forloop.index }}"><em></em><em></em><span>Go on site</span></a></p>
				{% if work.client_link %}
				<p class="lnk-client"><a href="{{ work.client_link }}" title="This project is an idea of {{ work.client_name }}" target="_blank">This project is an idea of {{ work.client_name }}</a></p>
				{% endif %}
			</div>
			{% if work.gallery.cover %}
			<div class="background">
				<img src="{{ work.gallery.cover }}" alt="{{ work.title }}" title="{{ work.title }}" data-type="background" />
			</div>
			{% endif %}
		</article>
		{% endfor %}
	</div>
</section>
