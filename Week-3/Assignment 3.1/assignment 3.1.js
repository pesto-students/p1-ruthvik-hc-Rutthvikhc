const memoize = () =>{
    let cache = {};
    return (a,b) =>{
        if ((a + '+' + b) in cache || (b + '+' + a) in cache) {
            console.log('Fetching from cache');
            return cache[a + '+' + b];
        }
        else {
            console.log('Calculated result');
            let result = a + b;
            cache[a + '+' + b] = result;
            cache[b + '+' + a] = result;
            return result;
        }
    }
}

const memoizedAdd = memoize();

console.log(memoizedAdd(2,3));
console.log(memoizedAdd(2,3));
console.log(memoizedAdd(3,2));