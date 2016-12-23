/**
 * Created by wuyifan on 16/12/20.
 */

// This is my underscore for practice.

window.__ = {
    VERSION: "0.1.0",
    //Here is a object funcitons
    each:function(obj,iterator,context){
        try {
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
        } catch(e){
            if( e!= "__break__" ){
                throw e;
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
        });
        return momo;
    },
    detect:function(obj,iterator,context){
        var result;
        __.each(obj,function(value,index){
            if(iterator.call(context,value,index)){
                result = value;
                throw "__break__";
            }
        });
        return result;
    },
    select:function(obj,iterator,context){
        if(obj.filter) return obj.filter(iterator,context);
        var result=[];
        __.each(obj,function(value,index){
            if(iterator.call(context,value,index)){
                result.push(value);
            }
        });
        return result
    },
    reject:function(obj,iterator,context){
        var result=[];
        __.each(obj,function(value,index){
            if(!iterator.call(context,value,index)) result.push(value);
        });
        return result;
    },
    all:function(obj,iterator,context) {
        iterator = iterator || function (v) {
                return v;
            };//如果没有iterator,那么降级为返回本身是否存在;d
        if (obj.some) return obj.every(iterator, context);
        var result = true;
        __.each(obj, function (value, index) {
            if (!iterator.call(context, value, index)){
                debugger;
                result =false;
                throw "__break__";
            }
        });
        return result;
    },
    any:function(obj,iterator,context){
        iterator = iterator || function(v){return v;};
        if(obj.any){ return obj.any(iterator,context);}
        var result = false;
        __.each(obj,function(value,index){
            if(iterator.call(context,value,index)){
                result =true;
                throw "__break__";
            }
        });
        return result;
    },
    include:function(obj,target){
        if(_.isArray(obj)) return _.indexOf(obj,target) != -1;
        var found= false;
        __.each(obj,function(pair){
            if(pair.value === target){
                found = true;
                throw "__break__";
            }
        });
        return found;
    },
    invoke:function(obj,method){
        var args = _.toArray(arguments).slice(2);
        return __.map(obj,function(value){
            return value[method].apply(value,args);
        });
    },
    pluck:function(obj,key){
        var result = [];
        __.each(obj,function(value){
            result.push(value[key]);
        });
        return result;
    },
    max:function(obj,iterator,context){
        if(!iterator && Array.isArray(obj)){
            return Math.max.apply(Math,obj);
        }
        var result = null;
        __.each(obj,function(value,index){
            var computed = iterator? iterator.call(context,value,index) :value;
            if( result == null || computed >= result.computed){
                result = {
                    value:value,
                    computed:computed
                };
            }
        });
        return result.value;
    },
    min:function(obj,iterator,context){
        if(!iterator && Array.isArray(obj)){
            // return Math.min.apply(null,obj);
        }
        var result = null;
        __.each(obj,function(value,index){
            var computed = iterator? iterator.call(context,value,index):value;
            if( result == null || computed < result.computed){
                result = {
                    value:value,
                    computed:computed
                }
            }
        });
        return result.value;
    },
    sortBy:function(obj,iterator,context){
        var temp = __.map(obj,function(value,index){
            var criteria = iterator.call(context,value,index);
            return {
                value:value,
                criteria:criteria
            }
        });
        temp.sort(function(a,b){
            return a.criteria < b.criteria ? -1:1
        });
        return __.pluck(temp,"value");
    },
    sortedIndex:function(array,obj,iterator){
        throw new Error("还没有写好");
    },
    toArray:function(iterable){
        if(!iterable) return [];
        if(Array.isArray(iterable)) return iterable;
        return __.map(iterable,function(value){return value;});
    },
    size:function(obj){
        return __.toArray(obj).length;
    },

    // Here is an array functions
    first:function(array){
        return array[0];
    },
    last:function(array){
        return array[array.length -1];
    },
    compact:function(array){
        return __.select(array,function(value){ return !!value;});
    },
    flatten:function(array){
        
    }

};

