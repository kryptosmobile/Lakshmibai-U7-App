"use-strict";var Obopayments;!function(e){const t="https://obopaycards.obopay.com",n=`${t}/payments`,o=document.createElement("script");o.src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js",document.head.appendChild(o);let a;window.onload=(()=>{$('<div id="app-container" style="background: rgba(31, 30, 76, 0.6); z-index:1000000000; width:100vw; height:100vh;  position:absolute; top:0px; left:0px; display:flex; align-items:center; justify-content:center;"><iframe id="oboIframe" frameborder=0></iframe>').prependTo(document.body),(s=document.getElementById("oboIframe")).src=n,b(),function(){const e="@media screen and (min-width : 450px) { \n                      iframe { \n                        width : 450px;\n                        height: 550px\n                      } \n                    }\n                    @media screen and (max-width : 450px) {\n                      iframe { \n                        height : 100%; \n                        width : 100%;\n                      }\n                    };",t=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");t.appendChild(n),n.type="text/css",n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}()}),window.onmessage=(e=>{if(e.origin!==t)return;const n=e.data;if(requestId=n.requestId,messageId=n.messageId,response=n.response,"PAY_U_REQUEST"===messageId)return l=response.data,void function(){i=window.cordova.InAppBrowser.open(`${t}/${l.url}`,"_blank","location=yes,hidenavigationbuttons=no, clearcache=yes, clearsessioncache=yes"),document.addEventListener("deviceready",function(){i.addEventListener("loadstart",e=>{}),i.addEventListener("loadstop",e=>{i.executeScript({code:`(function(){ ${l.code} })()`},e=>{console.log("resp ==>>",e)})})},!1)}();if("PAY_U_RESPONSE"===messageId)return l={},void i.close();if("JS_SHOWN"===messageId)return c=!0,void(a&&r&&R(a.businessId,a.mobileNo,a.authKey,a.businessName,a.businessLogoUrl,a.businessColorHex,a.callback));if(I[requestId]){if("DISMISS_APP"===messageId){var o=I[requestId];return delete I[requestId],o.callback(response),void b()}if(-3===requestId)return r=!0,void g();o=I[requestId];if(delete I[requestId],"FAILURE"===n.response.code){if("ONGOING_ACTION"===messageId)return void o.callback(response);b()}o.callback(response)}});let s,i,d=1,r=!0,c=!1,u=!1,l={},I={};const f="0.2.0",m=function(){return function(e,t){this.requestId=e,this.callback=t}}(),p=function(){return function(e,t,n,o,a,s,i){this.businessId=e,this.mobileNo=t,this.authKey=n,this.businessName=o,this.businessLogoUrl=a,this.businessColorHex=s,this.callback=i}}();function E(e,t,n){if(r){e({code:"FAILURE",data:{errorCode:"SDK_INIT_PENDING",errorMessage:"Sdk is not initialised"}})}else u||(document.getElementById("app-container").style.visibility="visible",u=!0),y(e,"DIRECT_LINK",{directLink:t,dlParams:n})}function N(e,t,n){if(r){e({code:"FAILURE",data:{errorCode:"SDK_INIT_PENDING",errorMessage:"Sdk is not initialised"}})}else y(e,"API_REQUEST",{apiName:t,apiParams:n})}function y(e,t,n){const o=new m(d++,e);I[o.requestId]=o,test=o.requestId;const a={requestId:o.requestId,messageId:t,data:n};s.contentWindow.postMessage(a,"*")}function b(){document.getElementById("app-container").style.visibility="hidden",u=!1}function g(){c=!1,s.src=s.src}function R(e,t,n,o,s,i,d){if(I={},a=new p(e,t,n,o,s,i,d),r=!0,!c)return;y(function(e){if("FAILURE"!==e.code)r=!1,d(e);else switch(e.data.errorCode){case"RETRY_SDK_INIT":g(),R(a.businessId,a.mobileNo,a.authKey,a.businessName,a.businessLogoUrl,a.businessColorHex,a.callback);break;case"USER_NOT_ACTIVATED":r=!1,d(e);break;case"SDK_AUTH_EXPIRE":case"SDK_AUTH_INVALID":default:d(e)}},"REQUEST_SESSION",{version:f,businessId:e,mobileNo:t,authKey:n,businessName:o,businessLogoUrl:s,businessColorHex:i})}function S(e){E(function(t){t.data&&t.data.errorCode&&"OPERATION_IN_PROGRESS"===t.data.errorCode?e(t):(b(),e(t))},"sdkRoot/sdkLogin")}function _(e){N(function(t){"FAILURE"!==t.code||"NEED_MPIN_AUTH"!==t.data.code?e(t):S(_(e))},"getKycStatus")}e.initialize=R,e.activateUser=function(e,t){if(!e)throw Error("Missing User Details");E(function(e){e.data&&e.data.errorCode&&"OPERATION_IN_PROGRESS"===e.data.errorCode?t(e):(b(),t(e))},"sdkRoot/sdkRegistration",{userDetails:e})},e.updateUserDetails=function(e,t){N(function(e){b(),t(e)},"updateUserDetails",e)},e.loginUser=S,e.getKycStatus=_,e.getBalance=function(e){N(function(t){"FAILURE"!==t.code||"NEED_MPIN_AUTH"!==t.data.code?e(t):S(_(e))},"getBalance")},e.unlockCard=function e(t){N(function(n){"FAILURE"!==n.code||"NEED_MPIN_AUTH"!==n.data.code?t(n):S(e(t))},"unlockCard")},e.getCardStatus=function e(t){N(function(n){"FAILURE"!==n.code||"NEED_MPIN_AUTH"!==n.data.code?t(n):S(e(t))},"getCardStatus")},e.viewTransactionHistory=function(e,t){E(function(e){e.data&&e.data.errorCode&&"OPERATION_IN_PROGRESS"===e.data.errorCode?t(e):(b(),t(e))},"walletMgmt/walletHistory",e)},e.selectTransactionHistory=function(e,t){E(function(e){e.data&&e.data.errorCode&&"OPERATION_IN_PROGRESS"===e.data.errorCode?t(e):(b(),t(e))},"walletMgmt/walletHistory",{walletType:e.walletType,selectable:!0})},e.addMoney=function(e,t){e.isRunningInCordova=window.cordova&&void 0!==window.cordova.InAppBrowser,E(function(e){e.data&&e.data.errorCode&&"OPERATION_IN_PROGRESS"===e.data.errorCode?t(e):(b(),t(e))},"loadMoney/selectPg",e)},e.sendMoney=function(e,t){E(function(e){e.data&&e.data.errorCode&&"OPERATION_IN_PROGRESS"===e.data.errorCode?t(e):(b(),t(e))},"sendMoney/transMoney",e)},e.collectRequest=function(e,t){E(function(e){e.data&&e.data.errorCode&&"OPERATION_IN_PROGRESS"===e.data.errorCode?t(e):(b(),t(e))},"sendMoney/collectRequest",e)},e.lockCard=function(e){E(function(t){t.data&&t.data.errorCode&&"OPERATION_IN_PROGRESS"===t.data.errorCode?e(t):(b(),e(t))},"cardMgmt/changeCardStatus",{action:"LOCK"})},e.blockCard=function(e){E(function(t){t.data&&t.data.errorCode&&"OPERATION_IN_PROGRESS"===t.data.errorCode?e(t):(b(),e(t))},"cardMgmt/changeCardStatus",{action:"BLOCK"})},e.reqMoney=function(e,t){E(function(e){b(),t(e)},"reqMoney/selectSender",{mobileNo:e.mobileNo,amount:e.amount})},e.closeApp=function(){E(()=>{},"landing/index"),b()},e.payViaQrCode=function(e,t){E(function(e){b(),t(e)},"scanAndPay/scanMerchantQr",{amount:e.amount})},e.payViaVpa=function(e,t){E(function(e){b(),t(e)},"scanAndPay/payViaVpa",{amount:e.amount,vpaId:e.vpaId})}}(Obopayments||(Obopayments={}));