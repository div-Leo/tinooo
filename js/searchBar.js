function saveSearchDBOmnibox(searchEngine, whatSearch) {
	$.ajax({
		url: "../php/saveSearchDB.php"
		, data: {
			searchEngine: searchEngine
			, query: whatSearch
		}
		, error: function(data) {
			console.error("ERROR");
		}
	});
	deleteCookieTile();
}

function searchWithBrainBar(x) {
	if ($("input").val().trim() && $("input").val().trim() != "") {
	
		var i = 0;
		var t = $("input").val().toLowerCase();

		motore = t.trim().slice(t.trim().length-3,t.trim().length);

		motoreTranslate = t.trim().slice(t.trim().length-5,t.trim().length);

		for (var o = 0; o < lSearchEngine.length; o++) {
			var e = lSearchEngine[o].split(" ");

			if (motoreTranslate == e[0]) {
				t = t.slice(0,t.trim().length-8).replace(/%20/g, " ");
				actionSearchBar(t, e[1], e[2]);
				x = true;
			}
			if (motore == e[0]) {
				t = t.slice(0,t.trim().length-3).replace(/%20/g, " ");
				actionSearchBar(t, e[1], e[2]);
				x = true;
			}
			else i+=1;
		}
		if (!x) {
			actionSearchBar(t, "google.it/?gws_rd=ssl#q=", "Google");
		}
	}
}

function actionSearchBar(text, link, name) {
	var textSearch = text.split('&').join('%26').split(' ').join('+');
	window.location = "http://" + link + textSearch;
	saveSearchDBOmnibox(name, text);
	saveHistorySearch(text);
}

$(function() {

	var search = $('#search').val();
	searchWithBrainBar();
	
});