/**
* name 
*/

declare const gapi: any; //聲明未來將會有個叫做gapi的東西，這玩意兒需要在執行後html引入googleAPI後才會產生，編寫階段typescript並不了解
declare const fs: any;
// const fs: any = require("fs");
// require(["fs"], ()=> {const fs: any = require("fs");} );

module DataManager 
{
	
	export class GoogleManager implements IDataManager
	{
		private auth2:any;
		private drive:any;
		m_nDefaultExistDays:number; //預設的資料存活時間
		private static g_googleClient:HTMLMetaElement = document.createElement("meta");
		private static g_googlePlatform:HTMLScriptElement = document.createElement("script");
		private static g_googleClientID:string = "224880618061-mg2kf12elebto581h9ssci52kc1v412b.apps.googleusercontent.com";
		private static g_googleAPIKey:string = "AIzaSyDzdJxuBgZO3ppK9ADZm8NkJ_NrplD6xr0";
		private static g_driveScope = "https://www.googleapis.com/auth/drive.appdata";
		private static g_arrDiscoveryDocs:Array<string> = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

		constructor() 
		{
			gapi.load('client:auth2', () => 
			{
			    this.auth2 = gapi.auth2.init({
					client_id: GoogleManager.g_googleClientID,
					cookiepolicy: 'single_host_origin',
					scope: 'profile email'
				});
				console.log("成功載入auth並初始化");
				gapi.client.init({
					apiKey: GoogleManager.g_googleAPIKey,
					client_id: GoogleManager.g_googleClientID,
					discoveryDocs: GoogleManager.g_arrDiscoveryDocs,
					scope: GoogleManager.g_driveScope
				});
				this.drive = gapi.client.drive;
			});//事前載入gapi中的auth2函式

			// if(!document.head.contains(GoogleManager.g_googleClient) )
			// {
			// 	GoogleManager.g_googleClient.name = "google-signin-client_id";
			// 	GoogleManager.g_googleClient.content = GoogleManager.g_googleClientID;
			// 	document.head.appendChild(GoogleManager.g_googleClient);
			// }
						
			// if(!document.head.contains(GoogleManager.g_googlePlatform) )
			// {
			// 	GoogleManager.g_googlePlatform.src = "https://apis.google.com/js/platform.js";
			// 	GoogleManager.g_googlePlatform.async = true;
			// 	GoogleManager.g_googlePlatform.defer = true;
			// 	document.head.appendChild(GoogleManager.g_googlePlatform);
			// }
		}
		SignIn():void
		{
			this.auth2.signIn()
			.then( () =>
			{
				if(this.auth2.isSignedIn.get())
				{
					console.log("確認登入");
					let profile = this.auth2.currentUser.get().getBasicProfile();
					console.log('ID: ' + profile.getId());
					console.log('Full Name: ' + profile.getName());
					console.log('Given Name: ' + profile.getGivenName());
					console.log('Family Name: ' + profile.getFamilyName());
					console.log('Image URL: ' + profile.getImageUrl());
					console.log('Email: ' + profile.getEmail());
					console.log("G Suite domain: " + this.auth2.currentUser.get().getHostedDomain() );
					
					gapi.client.drive.files.list({
						'pageSize': 3,
						'fields': "nextPageToken, files(id, name)"
					}).then((response)=>{
						let files:Array<any> = response.result.files;
						if (files && files.length > 0)
						{
							for (var i = 0; i < files.length; i++)
							{
								let file:any = files[i];
								console.log(file.name + ' (' + file.id + ')');
							}
						} else
						{
							console.log('No files found.');
						}
					});

					// require(['fs'], (fooModule)=>
					// {
					// 	var fs = require("fs");
					// 	// do something with fooModule
					// })
					let fileMetadata = {
						'name': 'config.json',
  						'parents': ['appDataFolder']
					};
					let media = {
						mimeType: 'application/json',
						body: fs.createReadStream('files/config.json')
					};
					this.drive.files.create({
						resource: fileMetadata,
						media: media,
						fields: 'id'
					}, (err, file) =>{
						if (err) 
						{
							// Handle error
							console.error(err);
						} else 
						{
							console.log('Folder Id:', file.id);
						}
					});
				}
			});
		}
		SignOut():void
		{
			console.log("GoogleManager的登出尚未實作");
		}
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
		
	}
}