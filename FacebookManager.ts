/**
* name 
*/
declare const FB:any;

interface Window
{
	fbAsyncInit: () => any;
}

module DataManager
{

	export class FacebookManager implements IDataManager , IDataReposter
	{		
		constructor()
		{
			// window.fbAsyncInit = ()=> {
			// 	FB.init({
			// 	appId            : 'your-app-id',
			// 	autoLogAppEvents : true,
			// 	xfbml            : true,
			// 	version          : 'v2.12'
			// 	});
			// };

			// (function(d, s, id){
			// 	var js, fjs = d.getElementsByTagName(s)[0];
			// 	if (d.getElementById(id)) {return;}
			// 	js = d.createElement(s); js.id = id;
			// 	js.src = "https://connect.facebook.net/en_US/sdk.js";
			// 	fjs.parentNode.insertBefore(js, fjs);
			// }(document, 'script', 'facebook-jssdk'));
			window.fbAsyncInit = ()=>{
				FB.init({
					appId: "1048113598669819", // App ID
					status: true, // check login status
					cookie: true, // enable cookies to allow the server to access the session
					oauth: true, // enable OAuth 2.0
					xfbml: true,  // parse XFBML
					frictionlessRequests: true
				});
				FB.getLoginStatus((response) => {
					this.statusChangeCallback(response);
				});
			}
			

			((d, s, id) => {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/zh_TW/all.js";
                fjs.parentNode.insertBefore(js, fjs);
            })(document, 'script', 'facebook-jssdk');
		}

		private statusChangeCallback(response:any):void
		{
				console.log('statusChangeCallback');
                console.log(response);
                // The response object is returned with a status field that lets the
                // app know the current login status of the person.
                // Full docs on the response object can be found in the documentation
                // for FB.getLoginStatus().
                if (response.status === 'connected')
                {
                    // Logged into your app and Facebook.
                    this.testAPI();
                } else
                {
                    // The person is not logged into your app or we are unable to tell.
                    console.log('Please log ' +
                        'into this app.');
                }
		}

		private testAPI():void
		{
			console.log('Welcome!  Fetching your information.... ');
			FB.api('/me', (response) => {
				console.log('Successful login for: ' + response.name);
				console.log('Thanks for logging in, ' + response.name + '!');
			});
		}

		private checkLoginState():void
		{
			console.log("登入進來");
			FB.getLoginStatus((response) => {
				console.log("獲得登入狀態");
				this.statusChangeCallback(response);
			});
		}

		m_nDefaultExistDays:number = 1; //預設的資料存活時間
        SignIn(_sAccount?:string , _sPassword?:string):void
		{
			console.log("進入FBManager的signin");
			FB.login( (response) => {
				if (response.status === 'connected')
				{
					console.log('We are connected.');
					// document.getElementById('login').style.visibility = 'hidden';
				} else if (response.status === 'not_authorized')
				{
					console.log('We are not logged in.');
				} else
				{
					console.log('You are not logged into Facebook.');
				}
			}, { scope: 'public_profile,email' });
		}
        SignOut():void
		{
		
		}
        Read(_sKey:string):string //帶入key值以求得對應的資料
		{
			return "";
		}
        Write(_sKey:string , _sValue:string , _nExistDays?:number):void //寫入新的資料項，需要key值與其對應的value，最後的參數則是該資料會存活多久
		{

		}
        Remove(_sKey:string):void //依照所輸入的key值刪除對應之資料項
		{

		}

		Repost(_url:string):void
		{
			FB.ui({
				method: 'share',
				mobile_iframe: true,
				href: _url,
				quote:"肥宅打quote" //分享時會額外多加文字，這行文字使用者只能決定要不要留，無法編輯
			}, function (response) { });
		}
	}
}