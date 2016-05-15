$(function () {
	$("#addToCart").click(function () {
		var code = $("#code").val();
		var color = $("#color").val();
		if (color == undefined)
			color = "";
		var size = $("#size").val();
		var quantity = $("#quantity").val();

		$.ajax({
			url: "/Product/AddToCartAjax",
			data: "code="+code+"&color="+color+"&size="+size+"&quantity="+quantity,
			method: "post",
			success: GenerateShoppingCartWidget,
			error: function (data) {
				console.log("ERROR in /Product/AddToCartAjax");
				console.log(data);
				alert("An error occured. Refresh the page and try again.");
			}
		});
	});

	$("#addToFavorites").click(function () {
		var code = $("#code").val();
		var color = $("#color").val();
		if (color == undefined)
			color = "";
		var size = $("#size").val();

		$.ajax({
			url: "/Favorites/AddToFavoritesAjax",
			data: "code=" + code + "&color=" + color + "&size=" + size,
			method: "post",
			success: UpdateFavorites,
			error: function (data) {
				console.log("ERROR in /Favorites/AddToFavoritesAjax");
				console.log(data);
				alert("An error occured. Refresh the page and try again.");
			}
		});
	});
});
