
module.exports = (options, app) => {
    return function* clientMiddleware(next) {
  
      //clientType
      const ua = (this.get('user-agent') || '').toLowerCase();
      let clientType = '';
  
      if(ua.match('micromessenger')) {
        clientType = 'wechat_web';
  
      } else if(ua.match('android|phone')) {
        if(ua.match('mobile')) {
          clientType = 'web_phone';
        } else {
          clientType = 'web_pad';
        }
  
      } else if(ua.match('ipad')) {
          clientType = 'web_pad';
  
      } else if(ua.match('mobile|iphone')) {
        clientType = 'web_phone';
  
      } else {
        clientType = 'web_pc';
      }
  
      this.request.headers.clientType = clientType;
  
      //clientId
      const querystring = require('querystring');
      const cookieString = this.request.headers.cookie || '';
      const cookies = querystring.parse(cookieString.replace(/; /g, '&'));
      let clientId = cookies.clientId || this.request.headers.clientid;
      if(!clientId) {
        const uuid = require('uuid/v1');
        clientId = uuid().replace(/-/g, '');
        this.cookies.set('clientId', clientId, {
          expires: new Date(2100, 1, 1, 0, 0, 0),
          httpOnly: false,
          signed: false
        });
      }
      this.request.headers.clientId = clientId;
      if(this.request.headers.clientid) {
        delete this.request.headers.clientid;
      }
  
      //accessToken
      let accessToken = cookies.accessToken || this.request.headers.accesstoken;
      if(accessToken) {
        this.request.headers.accessToken = accessToken;
        delete this.request.headers.accesstoken;
      }
  
      yield next;
    }
  };
  