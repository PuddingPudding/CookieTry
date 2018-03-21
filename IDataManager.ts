/*
* name;
*/

/*export*/ interface IDataManager
{
    m_nDefaultExistDays:number; //預設的資料存活時間
    Read(_sKey:string):string; //帶入key值以求得對應的資料
    Write(_sKey:string , _sValue:string , _nExistDays?:number):void; //寫入新的資料項，需要key值與其對應的value，最後的參數則是該資料會存活多久
    Remove(_sKey:string):void; //依照所輸入的key值刪除對應之資料項
}