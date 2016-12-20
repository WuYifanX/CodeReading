/**
 * Created by wuyifan on 16/12/20.
 */

// This is my underscore for practice.

window.__ = {
    VERSION: "0.1.0",
    each:function(obj,iterator,context){
        if(obj.forEach){
            obj.forEach(iterator,context);
        }else if(obj.length){
            for(var i=0,len=obj.length;i<len;i++){
                iterator.call(context,obj[i],i);}
        }else{
            var i=0;
            for(var key in obj){
                if(obj.hasOwnProperty(key))
                    var value = obj[key],pair = [key,value];
                    pair.key = key;
                    pair.value = value;
                    iterator.call(context,pair,i++);
                }
            }
        return obj;
    },
    map:function(obj,iterator,context){
        if(obj.map){
            return obj.map(iterator,context);
        }else{
            var result = [];
            __.each(obj,function(value,key){
                result.push(iterator.call(context,value,key));
            });
            return result;
        }
    },
    inject:function(obj,momo,iterator,context){
        __.each(obj,function(value,index){
            momo = iterator.call(context,momo,value,index)

        })
    }
};
