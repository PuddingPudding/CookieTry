/**
* name 
*/
module DataManager 
{
	export class GoogleManager implements IDataManager
	{
		m_nDefaultExistDays:number; //預設的資料存活時間
		private static g_googleClient:HTMLMetaElement = document.createElement("meta");
		private static g_googlePlatform:HTMLScriptElement = document.createElement("script");
        Read(_sKey:string):string //帶入key值以求得對應的資料
		{
			let sOutputValue:string = "";
			return sOutputValue;
		}
        Write(_sKey:string , _sValue:string , _nExistDays?:number):void //寫入新的資料項，需要key值與其對應的value，最後的參數則是該資料會存活多久
		{

		}
        Remove(_sKey:string):void //依照所輸入的key值刪除對應之資料項
		{

		}
		constructor() 
		{
			if(!document.head.contains(GoogleManager.g_googleClient) )
			{
				GoogleManager.g_googleClient.name = "google-signin-client_id";
				GoogleManager.g_googleClient.content = "224880618061-mg2kf12elebto581h9ssci52kc1v412b.apps.googleusercontent.com";
				document.head.appendChild(GoogleManager.g_googleClient);
			}
						
			if(!document.head.contains(GoogleManager.g_googlePlatform) )
			{
				GoogleManager.g_googlePlatform.src = "https://apis.google.com/js/platform.js";
				GoogleManager.g_googlePlatform.async = true;
				GoogleManager.g_googlePlatform.defer = true;
				document.head.appendChild(GoogleManager.g_googlePlatform);
			}
		}
	}
}