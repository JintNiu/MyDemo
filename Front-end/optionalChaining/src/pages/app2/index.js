const a=2
const fn=()=>{
    console.log(`app` + a)
}

fn()

const obj = {
    qwe: {
        asd: {
            zxc: '666'
        }
    }
}

console.log(obj.qwe.asd.zxc); 
// console.log(obj.abc.def.ghi); 
console.log(obj?.abc?.def?.ghi); 

