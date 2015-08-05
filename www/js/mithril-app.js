var WatchStock = {
	controller: function(options) {
		var ctrl = this;
		ctrl.symbol = m.prop('');
		ctrl.watchStock = function() {
			options.watchStockHandler(ctrl.symbol());
			ctrl.symbol('');
		};
	},
	view: function(ctrl, options) {
		return m('.row', [
			m('p', 'Available stocks for emo: MCD, BA, BAC, LLY, GM, GE, UAL, WMT, AAL, JPM'),
			m('.input-group', [
				m('input[type=text].form-control[placeholder="Comma separated list of stocks to watch..."]', {
					value: ctrl.symbol(),
					oninput: m.withAttr('value', ctrl.symbol)
				}),
				m('span.input-group-btn', [
					m('button.btn.btn-default[type=button]', {
						onclick: ctrl.watchStock
					}, [
						m('span.glyphicon.glyphicon-eye-open[aria-hidden="true"]', ' Watch')
					])
				])
			])
		])
	}
};

var StockRow = {
	controller: function(options) {
		var ctrl = this;
		ctrl.unwatch = function() {
			options.unwatchStockHandler(options.stock.symbol)
		}
	},
	view: function(ctrl, options) {
		var lastClass = '',
			changeClass = 'change-positive',
			iconClass = 'glyphicon glyphicon-triangle-top';
		if (options.stock === options.last) {
			lastClass = options.stock.change < 0 ? 'last-negative' : 'last-positive';
		}
		if (options.stock.change < 0) {
			changeClass = 'change-negative';
			iconClass = 'glyphicon glyphicon-triangle-bottom';
		}
		return m('tr', [
			m('td', options.stock.symbol),
			m('td', options.stock.open),
			m('td', {
				class: lastClass
			}, options.stock.last),
			m('td', {
				class: changeClass
			}, options.stock.change, [
				m('span', ' '),
				m('span[aria-hidden="true"]', {
					class: iconClass
				})
			]),
			m('td', options.stock.high),
			m('td', options.stock.low),
			m('td', [
				m('button[type=button].btn.btn-default.btn-sm', {
					onclick: ctrl.unwatch
				}, [
					m('span.glyphicon.glyphicon-eye-close[aria-hidden="true"]')
				])
			])
		])
	}
}

var StockTable = {
	view: function(ctrl, options) {
		var items = [];
		for (var symbol in options.stocks) {
			var stock = options.stocks[symbol];
			items.push(m.component(StockRow, {
				key: stock.symbol,
				stock: stock,
				last: options.last,
				unwatchStockHandler: options.unwatchStockHandler
			}))
		}
		return m('div.row', [
			m('table.table-hover', [
				m('thead', [
					m('tr', [
						m('th', 'Symbol'),
						m('th', 'Open'),
						m('th', 'Last'),
						m('th', 'Change'),
						m('th', 'High'),
						m('th', 'Low'),
						m('th', 'Unwatch')
					])
				]),
				m('tbody', items)
			])
		]);
	}
};

var HomePage = {
	controller: function(options) {
		var ctrl = this;
		ctrl.stocks = m.prop({});
		ctrl.last = m.prop();
		var stocks = {};
		feed.watch(['MCD', 'BA', 'BAC', 'LLY', 'GM', 'GE', 'UAL', 'WMT', 'AAL', 'JPM']);
		feed.onChange(function(stock) {
			m.startComputation();
			stocks[stock.symbol] = stock;
			ctrl.stocks(stocks);
			ctrl.last(stock);
			m.endComputation();
		});
		ctrl.watchStock = function(symbols) {
			symbols = symbols.replace(/ /g, '');
			var arr = symbols.split(',');
			feed.watch(arr);
		};
		ctrl.unwatchStock = function(symbol) {
			feed.unwatch(symbol);
			var stocks = ctrl.stocks();
			delete stocks[symbol];
			ctrl.stocks(stocks);
		};
	},
	view: function(ctrl, options) {
		return m('div', [
			m.component(WatchStock, {
				watchStockHandler: ctrl.watchStock
			}),
			m.component(StockTable, {
				stocks: ctrl.stocks(),
				last: ctrl.last(),
				unwatchStockHandler: ctrl.unwatchStock
			}),
			m('.row', [
				m('.alert.alert-warning[role=alert]', 'All stock values are fake and changes are simulated. Do not trade on the above data. ')
			])
		]);
	}
};


m.mount(document.getElementById('main'), HomePage);