var axios = require('axios')

module.exports = axios.create({
	url:'/json',
	baseURL: 'http://192.168.***.**:3000',
	withCredentials: true,//允许跨域请求发送cookie等用户认证凭据
	dataType: 'JSONP'
})

