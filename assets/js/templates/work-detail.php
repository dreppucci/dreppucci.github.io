<div class="scroller">
	<%= body %>
	<div class="row" id="detail-slide">
		<div class="handle">
			<% _.each( gallery, function(img, index) {
				if( index !== 0 ) {
			%>
			<div class="media">
				<img src="/<%= img.path_original %>" width="600" alt="" title="" />
			</div>
			<%
				}
			} );
			%>
		</div>
	</div>
	<% if( client_link.length > 0 ) %><div class="row"><p>This project is an idea of <a href="<%= client_link %>" title="This project is an idea of <%= client_name %>" target="_blank"><%= client_name %></a> and I've just worked with their team</p></div>
	<% if( link.length > 0 ) %><div class="row"><p class="lnk-project"><a href="<%= link %>" title="<%= link %>" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="768px" height="768px" viewBox="0 128 768 768" enable-background="new 0 128 768 768" xml:space="preserve"><path d="M680 818H78V197.906L256 196v-68H0v768h768V626h-88V818z M384 128l128 128L320 448l128 128l192-192l128 128V128H384z"/></svg> view the project</a></p></div>
</div>