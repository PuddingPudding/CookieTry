/*
* name;
*/
import Sprite = Laya.Sprite;
import Stage = Laya.Stage;
import Browser = Laya.Browser;
import WebGL = Laya.WebGL;
import UI = laya.ui;
import Handler = Laya.Handler;
import CookieManager = DataManager.CookieManager;
import IDataManager = DataManager.IDataManager;
import GoogleManager = DataManager.GoogleManager;
declare const gapi: any; //聲明未來將會有個叫做gapi的東西，這玩意兒需要在執行後html引入googleAPI後才會產生，編寫階段typescript並不了解

class CookieTry
{
    private m_cookieManager:IDataManager;
    private btnSkinA : string  =  "img/button.png" ; //預先加載按鈕圖片
    // private btnSkinB : string  =  "../res/img/button.png" ; //預先加載按鈕圖片
    public auth2: any;

    constructor()
    {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
            
            console.log("CookieTryGoInTo");
            this.m_cookieManager = new CookieManager();

            Laya.stage.alignV = Stage.ALIGN_TOP;
            Laya.stage.alignH = Stage.ALIGN_CENTER;

            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#00FFEE";

            Laya . loader . load ( this .btnSkinA , Laya . Handler . create ( this , this . PlayCookie ));
    }
    private PlayCookie(): void
    {
        var textCookieName: Laya.Text = new Laya.Text();
        textCookieName.text = "輸入cookieName: ";
        textCookieName.fontSize = 25;

        var textCookieValue: Laya.Text = new Laya.Text();
        textCookieValue.text = "輸入cookieValue: ";
        textCookieValue.fontSize = 25;
        textCookieValue.pos(textCookieName.x , textCookieName.height + 5);

        var textCheckingCookie: Laya.Text = new Laya.Text();
        textCheckingCookie.text = "餅乾測試";
        textCheckingCookie.fontSize = 50;
        textCheckingCookie.pos(100  , 100);

        var cookieInputBar: Laya.Input = new Laya.Input();
        cookieInputBar.borderColor = "#000000";
        cookieInputBar.bgColor = "#d0d0d0";
        cookieInputBar.height = 25;
        cookieInputBar.width = 150;
        cookieInputBar.pos(textCookieName.x + textCookieName.width , 0);

        var cookieValueInputBar: Laya.Input = new Laya.Input();
        cookieValueInputBar.borderColor = "#000000";
        cookieValueInputBar.bgColor = "#d0d0d0";
        cookieValueInputBar.height = 25;
        cookieValueInputBar.width = 150;
        cookieValueInputBar.pos(textCookieValue.x + textCookieValue.width , textCookieValue.y);

        var submitButton: Laya.Button = new Laya.Button(this.btnSkinA);
        submitButton.height = 25;
        submitButton.width = 150;
        submitButton.label = "存入cookie";
        submitButton.labelSize = 20
        submitButton.pos(cookieInputBar.x + cookieInputBar.width + 25 , cookieInputBar.y);
        submitButton.clickHandler = new Handler(this, this.AddCookie, [cookieInputBar,cookieValueInputBar]);

        var deleteButton: Laya.Button = new Laya.Button(this.btnSkinA);
        deleteButton.height = 25;
        deleteButton.width = 150;
        deleteButton.label = "刪除cookie";
        deleteButton.labelSize = 20;
        deleteButton.pos(submitButton.x , submitButton.y + submitButton.height + 5);
        deleteButton.clickHandler = new Handler(this, this.DeleteCookie, [cookieInputBar]);

        var checkButton: Laya.Button = new Laya.Button(this.btnSkinA);
        checkButton.height = 25;
        checkButton.width = 150;
        checkButton.label = "依照name顯示cookie";
        checkButton.labelSize = 10;
        checkButton.pos(deleteButton.x , deleteButton.y + deleteButton.height + 5);
        checkButton.clickHandler = new Handler(this, this.OutputCookie, [cookieInputBar,textCheckingCookie]);
        
        //in HTML: <head id="my-document-head">
        let aHead = document.head;
        
        let googleClient:HTMLMetaElement = document.createElement("meta");
        googleClient.name = "google-signin-client_id";
        googleClient.content = "224880618061-mg2kf12elebto581h9ssci52kc1v412b.apps.googleusercontent.com";
        
        // console.log(aHead.childElementCount); // "my-document-head";
        // aHead.appendChild(googleClient);
        // console.log(aHead.childElementCount); // "my-document-head";
        // console.log(aHead.innerHTML);
        // console.log(googleClient);
        // let m_googlePlatform:HTMLScriptElement = document.createElement("script");
        // m_googlePlatform.src = "https://apis.google.com/js/platform.js";
        // m_googlePlatform.async = true;
        // m_googlePlatform.defer = true;
        // aHead.appendChild(m_googlePlatform);

        console.log("原本的<head>中有" + document.head.childElementCount + "個元素");
        let m_googleManager:IDataManager = new GoogleManager();
        console.log("加入第一個googleManager後有" + document.head.childElementCount + "個元素");
        console.log(document.head.innerHTML);
        let m_googleManager2:IDataManager = new GoogleManager();
        console.log("加入第二個googleManager後有" + document.head.childElementCount + "個元素");
        console.log(document.head.innerHTML);

        let m_btnGoogleLogin: Laya.Button = new Laya.Button(this.btnSkinA);
        m_btnGoogleLogin.height = 25;
        m_btnGoogleLogin.width = 150;
        m_btnGoogleLogin.label = "由Google登入";
        m_btnGoogleLogin.labelSize = 10;
        m_btnGoogleLogin.pos(checkButton.x , checkButton.y + checkButton.height + 5);
        m_btnGoogleLogin.clickHandler = new Handler(this, this.GoogleLogin,[m_btnGoogleLogin]);

        document.body.appendChild

        Laya.stage.addChild(textCookieName);
        Laya.stage.addChild(textCookieValue);
        Laya.stage.addChild(cookieInputBar);
        Laya.stage.addChild(cookieValueInputBar);
        Laya.stage.addChild(submitButton);
        Laya.stage.addChild(deleteButton);
        Laya.stage.addChild(textCheckingCookie);
        Laya.stage.addChild(checkButton);
        Laya.stage.addChild(m_btnGoogleLogin);
    }
    private AddCookie(inputText:Laya.Input , inputValue?:Laya.Input): void
    {
        if(inputValue != null)
        {
            this.m_cookieManager.Write(inputText.text , inputValue.text , 0.025);
        }
        else
        {
            this.m_cookieManager.Write(inputText.text , "banana" , 0.025);
        }        
    }
    private DeleteCookie(inputText:Laya.Input):void
    {
        this.m_cookieManager.Remove(inputText.text);
    }
    private GetCookie(inputText:Laya.Input):String
    {
        return this.m_cookieManager.Read(inputText.text);
    }
    private OutputCookie(inputText:Laya.Input , outputText:Laya.Text):void
    {
        outputText.text = this.m_cookieManager.Read(inputText.text);
    }
    private GoogleLogin(_loginBtn:Laya.Button):void
    {
        gapi.load('auth2', () => 
        {
            this.auth2 = gapi.auth2.init
            ({
                client_id: '224880618061-mg2kf12elebto581h9ssci52kc1v412b.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                scope: 'profile email'
            });
        });
        // console.log(typeof(this.auth2));
        // this.auth2.attachClickHandler(_loginBtn, {},
        // (googleUser) => {
        //     let profile = googleUser.getBasicProfile();
        //     console.log('Token || ' + googleUser.getAuthResponse().id_token);
        //     console.log('ID: ' + profile.getId());
        //     console.log('Name: ' + profile.getName());
        //     console.log('Image URL: ' + profile.getImageUrl());
        //     console.log('Email: ' + profile.getEmail());
        //     //YOUR CODE HERE

        // }, (error) => {
        //     alert(JSON.stringify(error, undefined, 2));
        // });
        
    }
}