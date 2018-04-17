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
import FacebookManager = DataManager.FacebookManager;
// import gapi = DataManager.gapi;

class CookieTry
{
    private m_cookieManager:IDataManager;
    private m_googleManager:IDataManager;
    private m_facebookManager:IDataManager;
    private btnSkinA : string  =  "img/button.png" ; //預先加載按鈕圖片
    // private btnSkinB : string  =  "../res/img/button.png" ; //預先加載按鈕圖片
    public auth2: any;

    constructor()
    {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
            
            console.log("CookieTryGoInTo");
            this.m_cookieManager = new CookieManager();
            // this.m_googleManager = new GoogleManager();
            this.m_facebookManager = new FacebookManager();

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

        let m_btnGoogleLogin: Laya.Button = new Laya.Button(this.btnSkinA);
        m_btnGoogleLogin.height = 25;
        m_btnGoogleLogin.width = 150;
        m_btnGoogleLogin.label = "由Google登入";
        m_btnGoogleLogin.labelSize = 10;
        m_btnGoogleLogin.pos(checkButton.x , checkButton.y + checkButton.height + 5);
        m_btnGoogleLogin.clickHandler = new Handler(this, this.GoogleLogin,[m_btnGoogleLogin]);

        let m_btnCookieLogin: Laya.Button = new Laya.Button(this.btnSkinA);
        m_btnCookieLogin.height = 25;
        m_btnCookieLogin.width = 150;
        m_btnCookieLogin.label = "Cookie登入";
        m_btnCookieLogin.labelSize = 10;
        m_btnCookieLogin.pos(checkButton.x , checkButton.y + checkButton.height + 5 + 30);
        m_btnCookieLogin.clickHandler = new Handler(this, this.CookieLogin,[cookieInputBar , cookieValueInputBar]);

        let m_btnFBLogin: Laya.Button = new Laya.Button(this.btnSkinA);
        m_btnFBLogin.height = 25;
        m_btnFBLogin.width = 150;
        m_btnFBLogin.label = "Facebook登入";
        m_btnFBLogin.labelSize = 10;
        m_btnFBLogin.pos(checkButton.x , checkButton.y + checkButton.height + 5 + 60);
        m_btnFBLogin.clickHandler = new Handler(this,this.FacebookLogin);

        Laya.stage.addChild(textCookieName);
        Laya.stage.addChild(textCookieValue);
        Laya.stage.addChild(cookieInputBar);
        Laya.stage.addChild(cookieValueInputBar);
        Laya.stage.addChild(submitButton);
        Laya.stage.addChild(deleteButton);
        Laya.stage.addChild(textCheckingCookie);
        Laya.stage.addChild(checkButton);
        Laya.stage.addChild(m_btnGoogleLogin);
        Laya.stage.addChild(m_btnCookieLogin);
        Laya.stage.addChild(m_btnFBLogin);
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
        this.m_googleManager.SignIn();
    }
    private CookieLogin(_inputText:Laya.Input , _inputValue:Laya.Input):void
    {
        this.m_cookieManager.SignIn(_inputText.text , _inputValue.text);
    }
    private FacebookLogin():void
    {
        this.m_facebookManager.SignIn();
    }
}