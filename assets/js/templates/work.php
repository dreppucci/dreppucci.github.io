		
		<div class="content">
			<h1><%= title %></h1>
			<h2><%= abstract %></h2>
			<p class="btn"><a href="javascript:void(0)" title="View case study" data-id="<%= id %>">View case study</a></p>

			<div class="detail"></div>
			<p class="btn-close"><a href="javascript:void(0)" title="Close">Close</a></p>
		</div>
		
		<% if( gallery.length > 0 ) { %>
		<div class="background">
			<img src="/<%= gallery[0].path_original %>" alt="<%= title %>" title="<%= title %>" data-type="background" />
		</div>
		<% } %>