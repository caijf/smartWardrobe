(function (doc, win) {
	var apiKey = 'a55dbf7a726b53c3dd88a7eaba585a69',
		httpPrefix = 'http://api.reco4life.com/v/api.1.1/',
		uesrName = 'akm107',
		snObj = ['040001212', '040001273','040001604'],
		token = '',
		expires = 0;
		
	function getToken (sn) {
		var tokenObj,
			url = httpPrefix + 'get_token?' + $.param({
				'user_name': uesrName,
				'api_key': apiKey
			});

		mui.ajax(url, {
			dataType: 'json',
			success: function (data) {
				tokenHandler(data, sn);
				//getList(data.token);
			}
		});
	}
////	获取设备列表
////	function getList (token) {
////		var tokenObj,
////			url = httpPrefix + 'item_list?' + $.param({
////				'user_name': uesrName
////			});
////			
////		mui.ajax(url, {
////			headers: {'token': token},
////			dataType: 'json',
////			success: function (data) {
////				console.log( JSON.stringify(data) );
////			}
////		});
////	}
	
	function tokenHandler (data, sn) {
		token = data.token;
		expires = +new Date(data.expire_date);

		switchReco(sn, 1);
	}
	
	function switchReco (sn, status) {
		var url = httpPrefix + 'item_switch?' + $.param({
			'user_name': uesrName,
			'sn': sn,
			'status': status || 0
		});
		
		mui.ajax(url, {
			headers: {'token': token},
			dataType: 'json',
			success: function (data) {
				console.log('it is open');
				setTimeFun = setTimeout( function(){
					switchClose(sn);
				}, 5000);
			}
		});
	}
	
	function switchClose (sn) {		
		var url = httpPrefix + 'item_switch?' + $.param({
			'user_name': uesrName,
			'sn': sn,
			'status': 0
		});
		
		mui.ajax(url, {
			headers: {'token': token},
			dataType: 'json',
			success: function (data) {
				console.log('it is close');
			}
		});
	}
	
	function calculateSN (sn) {
		return snObj[sn-1];
	}
	
	function recoController (sn, status) {
		var now = +new Date();
		sn = calculateSN(sn);

		if (!token ) {
			getToken (sn);
		} else {
			switchReco(sn, 1);
		}
	}

	win.recoController = recoController;
	
}(document, window));