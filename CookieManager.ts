/*
* name;
*/


module DataManager
{
    export class CookieManager implements IDataManager
    // class CookieManager implements IDataManager
    {
        m_nDefaultExistDays:number;
        private static g_singleton:CookieManager;
        constructor()
        {
            console.log("Successfully construct CookieManager");
            this.m_nDefaultExistDays = 1;
        }
        SignIn(_sAccount?:string , _sPassword?:string):void
        {
            if(_sAccount == null)
            {
                _sAccount = "";
            }
            if(_sPassword == null)
            {
                _sPassword = "";
            }
            
            document.cookie = encodeURIComponent(_sAccount) + "=" + encodeURIComponent(_sPassword) + "; path=/ ; Domain = .google.com";
            console.log("欲寫入的cookie帳號為" + _sAccount + " 密碼則是" + _sPassword);
        }
        SignOut():void
        {
            
        }
        public Read(_sKey:string):string //帶入key值以求得對應的資料
        {
            let sOutputValue:string = "";
            let arrResult:RegExpExecArray = new RegExp('(?:^|; )(' + encodeURIComponent(_sKey) + ')=([^;]*)').exec(document.cookie);
            if(arrResult!=null)
            {
                // console.log(arrResult[0]);
                // console.log(arrResult[1]);
                // console.log(arrResult[2]);
                // console.log(arrResult[3]);
                sOutputValue = arrResult[2];
                return sOutputValue;
            }
            else
            {
                return null;
            }
        }
        public Write(_sKey:string , _sValue:string , _nExistDays?:number):void //寫入新的資料項，需要key值與其對應的value，最後的參數則是該資料會存活多久
        {
            if(!_nExistDays)
            {
                this.Write(_sKey , _sValue , this.m_nDefaultExistDays);
            }
            else
            {
                var dateExpires:Date = new Date();
                dateExpires.setTime(dateExpires.getTime() + (_nExistDays * 24 * 60 * 60 * 1000));
                
                var sExpires:string = "; expires=" + dateExpires.toUTCString(); //將日期轉為GMT格林威治標準時間
                document.cookie = encodeURIComponent(_sKey) + "=" + encodeURIComponent(_sValue) + sExpires + "; path=/";
            }
        }
        public Remove(_sKey:string):void //依照所輸入的key值刪除對應之資料項
        {
            this.Write(_sKey , "" , -1);
        }
    }
}
