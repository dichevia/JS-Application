(function(){
    String.prototype.ensureStart = function(str){
        if (!this.startsWith(str)){
           return `${str}${this}`;
        }
    
        return `${this}`;
    }
    
    String.prototype.ensureEnd = function(str){
        if (!this.endsWith(str)){
           return `${this}${str}`;
        }
    
        return `${this}`;
    }
    
    String.prototype.isEmpty = function(){
        return this.toString() === ''?true:false
    }
    
    String.prototype.truncate = function(n){
        let truncated;
        if (this.length<=n){
            return `${this}`
        }else  {
            if (n<4){
                return truncated = '.'.repeat(n);
            }
            if (this.lastIndexOf(' ')!==-1){
                truncated = this.substr(0, this.lastIndexOf(' '))
                while (truncated.length+'...'.length>n){
                    truncated = truncated.substr(0, truncated.lastIndexOf(' '))
                }
                return truncated+'...'
            }else{
                truncated = this.substr(0, n-3)+'...';
                return truncated
            }
        }
    }
    
    String.format = function(str, ...arg){
        for (let i = 0; i < arg.length; i++) {
            const placeholder = arg[i];
            str = str.replace(`{${i}}`, placeholder)
        }
    
        return str
    }
}())

let str = 'the quick brown fox jumps over the lazy dog';
// str.truncate(10)
// str = String.format('The {0} {1} fox',
//   'quick', 'brown');
//   str = String.format('jumps {0} {1}',
//   'dog');
console.log(str.truncate(43));