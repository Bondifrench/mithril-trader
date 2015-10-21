var WatchStock = {
	controller: function(args) {
		var ctrl = this;
		ctrl.symbol = m.prop('');
		ctrl.watchStock = function() {
			args.watchStockHandler(ctrl.symbol());
			ctrl.symbol('');
		};
	},
	view: function(ctrl, args) {
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
	controller: function(args) {
		var ctrl = this;
		ctrl.unwatch = function() {
			args.unwatchStockHandler(args.stock.symbol)
		}
	},
	view: function(ctrl, args) {
		var lastClass = '',
			changeClass = 'change-positive',
			iconClass = 'glyphicon glyphicon-triangle-top';
		if (args.stock === args.last) {
			lastClass = args.stock.change < 0 ? 'last-negative' : 'last-positive';
		}
		if (args.stock.change < 0) {
			changeClass = 'change-negative';
			iconClass = 'glyphicon glyphicon-triangle-bottom';
		}
		return m('tr', [
			m('td', args.stock.symbol),
			m('td', args.stock.open),
			m('td', {
				class: lastClass
			}, args.stock.last),
			m('td', {
				class: changeClass
			}, args.stock.change, [
				m('span', ' '),
				m('span[aria-hidden="true"]', {
					class: iconClass
				})
			]),
			m('td', args.stock.high),
			m('td', args.stock.low),
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
	view: function(ctrl, args) {
		var items = [];
		for (var symbol in args.stocks) {
			var stock = args.stocks[symbol];
			items.push(m.component(StockRow, {
				key: stock.symbol,
				stock: stock,
				last: args.last,
				unwatchStockHandler: args.unwatchStockHandler
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
	controller: function(args) {
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
	view: function(ctrl, args) {
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