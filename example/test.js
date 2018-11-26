import { authorize, userInfo } from '../server/aouth2.0/weixin';

authorize('test', (err, body) => {
  if(err){
    return;
  }
  userInfo(body.access_token,body.openid,(err, body)=>{
    if(err){

    }
  });
  
})