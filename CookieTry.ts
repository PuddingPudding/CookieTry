/*
* name;
*/
import Sprite = Laya.Sprite;
import Stage = Laya.Stage;
import Browser = Laya.Browser;
import WebGL = Laya.WebGL;
import UI = laya.ui;
import Handler = Laya.Handler;

module Cookie 
{
    export function read(name: string) :string
    {
        var result = new RegExp('(?:^|; )(' + encodeURIComponent(name) + ')=([^;]*)').exec(document.cookie);
        console.log(result);
        console.log(decodeURIComponent(result[1]));
        return result ? decodeURIComponent(result[2]) : null;
    }
    
    export function write(name: string, value: string, days?: number) : void
    {
        if (!days) 
        {
            document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
            //這裡有個方法叫做Laya.Browser.window.document.cookie，據說效果跟document.cookie相似
            console.log(name + "=" + value);
            console.log(document.cookie); //看全部的cookie
            console.log(Cookie.read(name));//看該name對應到的cookie
        }
        else
        {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            
            var expires = "; expires=" + date.toUTCString(); //將日期轉為GMT格林威治標準時間
            document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
            // document.cookie = name + "=" + value;
            console.log(name + "=" + value + expires + "; path=/");
            console.log(document.cookie);
            console.log(Cookie.read(name));
        }     
        ///////////////以上的方法為對cookie進行操作，然而目前這個方法似乎無法使用，因為chrome無法單純在本地端進行cookie操作的樣子
        // Laya.LocalStorage.setItem(name , value)
        // console.log(name + "=" + value);
        // console.log(document.cookie);
        // console.log(Cookie.read(name));
    }
    
    export function remove(name: string) : void
    {
        console.log(name);
        console.log(document.cookie);
        write(name, "", -1);
        console.log(document.cookie);
    }	
}

class CookieTry
{    
    private btnSkinA : string  =  "img/button.png" ; //預先加載按鈕圖片
    // private btnSkinB : string  =  "../res/img/button.png" ; //預先加載按鈕圖片
    constructor()
    {
        // 不支持WebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

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
        textCheckingCookie.fontSize = 75;
        textCheckingCookie.pos(500, 500);

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
            Cookie.write(inputText.text , inputValue.text , 0.025);
        }
        else
        {
            Cookie.write(inputText.text , "banana" , 0.025);
        }        
    }
    private DeleteCookie(inputText:Laya.Input):void
    {
        Cookie.remove(inputText.text);
    }
    private GetCookie(inputText:Laya.Input):String
    {
        return Cookie.read(inputText.text);
    }
    private OutputCookie(inputText:Laya.Input , outputText:Laya.Text):void
    {
        outputText.text = Cookie.read(inputText.text);
    }
}

new CookieTry;