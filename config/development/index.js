module.exports = {
	env: 'development',
	port: 3000,
	api: {
		root: '/api/v1',
		symbolSearch: 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22{{mysym}}%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
	},
	pages: {
		root: '/'
	},
	db: {
		database: 'd2sjm62h7m5do2',
		user: 'ffayrjbxbzlhiz',
		password: '3wbHBCt1KaSAXJvTo2Qv88YT4W',
		options: {
			host: 'ec2-54-83-56-177.compute-1.amazonaws.com',
			dialect: 'postgres',
			dialectOptions: {
				ssl: true
			},
			pool: {
				max: 5,
				min: 0,
				idle: 10000
			}
		}
	}
};
