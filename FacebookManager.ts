/**
* name 
*/
declare const FB:any;

module DataManager
{
	export class FacebookManager implements IDataManager
	{
		constructor()
		{
			// window = function() {
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
			
			FB.init({
				appId: "1048113598669819", // App ID
				status: true, // check login status
				cookie: true, // enable cookies to allow the server to access the session
				oauth: true, // enable OAuth 2.0
				xfbml: true,  // parse XFBML
				frictionlessRequests: true
			});
		}
		m_nDefaultExistDays:number; //預設的資料存活時間
        SignIn(_sAccount?:string , _sPassword?:string):void
		{

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
	}
}