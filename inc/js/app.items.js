/**
 * データを扱うクラス。いわゆるモデル
 */
;(function($){

	App.Items = function(json_url){

		var that = this;

		// 同期通信でデータ取得する
		$.ajaxSetup({ async : false });

		$.getJSON(json_url, function(data){
			that._gettable_data = that._data = data;
		});

		// 非同期通信の状態に戻す
		$.ajaxSetup({ async : true });
	}

	App.Items.prototype = {

		get_all : function(){
			return this._gettable_data;
		},


		get_all_attributes : function(attr_key){
			var that = this;

			var len = this._data.length;
			var array = [];
			for (var i = 0; i < len; i++) {
				array.push(this._data[i][attr_key]);
			};

			return array.filter(function (x, i, self) {
				return self.indexOf(x) === i;
			});

		},

		filter : function(conditions){
			var that = this;
			var result_data = this._data;

			if(conditions) {
				for (var key in conditions) {
					result_data = result_data.filter(function(val){
						return (val[key] == conditions[key]);
					});
				}
			}

			this._gettable_data = result_data;

			return this;
		}

	};

})(jQuery);
