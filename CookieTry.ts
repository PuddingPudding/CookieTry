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

class CookieTry
{

    private m_cookieManager:IDataManager;
    private btnSkinA : string  =  "img/button.png" ; //預先加載按鈕圖片
    // private btnSkinB : string  =  "../res/img/button.png" ; //預先加載按鈕圖片
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

        if(1)
        {
            console.log("1為true");
        }
        else
        {
            console.log("1為false");
        }

        if(0)
        {
            console.log("0為true");
        }
        else
        {
            console.log("0為false");
        }

        if(-1)
        {
            console.log("-1為true");
        }
        else
        {
            console.log("-1為false");
        }

        Laya.stage.addChild(textCookieName);
        Laya.stage.addChild(textCookieValue);
        Laya.stage.addChild(cookieInputBar);
        Laya.stage.addChild(cookieValueInputBar);
        Laya.stage.addChild(submitButton);
        Laya.stage.addChild(deleteButton);
        Laya.stage.addChild(textCheckingCookie);
        Laya.stage.addChild(checkButton);
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
}