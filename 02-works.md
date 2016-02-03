---
layout: page
title: Works
permalink: /works/
---

<section class="page-view work-view" id="works-list">
	<div class="handle main">
		{% assign sorted_works = (site.works | sort: 'order') %}
		{% for work in sorted_works %}
		<article>
			<div class="content">
				<h1>{{ work.title }}</h1>
				<h2>{{ work.abstract }}</h2>
				<p class="btn"><a href="javascript:void(0)" title="View case study" data-id="{{ forloop.index }}">View case study</a></p>

				<div class="detail" id="detail-{{ forloop.index }}">
					<div class="wrapper">
						<div class="scroller">
							{{ work.content }}
							<div class="row detail-slide" id="detail-slide">
								<div class="handle">
									{% if work.gallery.medias %}
										{% for media in work.gallery.medias %}
									<div class="media">
										<img src="/assets/works/{{ media.path }}" width="600" alt="" title="" />
									</div>
										{% endfor %}
									{% endif %}
								</div>
							</div>
							{% if work.client_link %}
							<div class="row"><p><a href="{{ work.client_link }}" title="Copyright of this project is of {{ work.client_name }}" target="_blank">Copyright of this project is of {{ work.client_name }}</a></p></div>
							{% endif %}
							{% if work.link %}
							<div class="row"><p class="lnk-project"><a href="{{ work.link }}" title="{{ work.link }}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="768px" height="768px" viewBox="0 128 768 768" enable-background="new 0 128 768 768" xml:space="preserve"><path d="M680 818H78V197.906L256 196v-68H0v768h768V626h-88V818z M384 128l128 128L320 448l128 128l192-192l128 128V128H384z"/></svg> view the project</a></p></div>
							{% endif %}
						</div>
					</div>
				</div>
				<p class="btn-close"><a href="javascript:void(0)" title="Close">Close</a></p>
			</div>
			{% if work.gallery.cover %}
			<div class="background">
				<img src="/assets/works/{{ work.gallery.cover }}" alt="{{ work.title }}" title="{{ work.title }}" data-type="background" />
			</div>
			{% endif %}
		</article>
		{% endfor %}
	</div>
</section>
