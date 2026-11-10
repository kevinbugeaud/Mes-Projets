/* Shared storage contract for vehicles and chargers. */
(function(root){
 const key='tesla-demo-cart-v1';
 function read(){const data=JSON.parse(localStorage.getItem(key)||'[]');if(!Array.isArray(data)||!data.every(x=>x&&typeof x.id==='string'&&typeof x.name==='string'&&typeof x.color==='string'&&Number.isFinite(x.price)&&x.price>=0&&Number.isInteger(x.quantity)&&x.quantity>0&&x.quantity<=99&&typeof x.image==='string'&&/^assets\/[a-z0-9-]+\.(png|svg)$/.test(x.image)))throw Error('Invalid cart');return data;}
 function write(items){localStorage.setItem(key,JSON.stringify(items));}
 root.Cart={read,add(item){const items=read(),existing=items.find(x=>x.id===item.id&&x.color===item.color);if(existing){if(existing.quantity>=99)throw Error('Quantity limit');existing.quantity++;}else items.push({...item,quantity:1});write(items);return items;},quantity(index,value){if(!Number.isInteger(value)||value<1||value>99)throw Error('Invalid quantity');const items=read();if(!items[index])throw Error('Missing item');items[index].quantity=value;write(items);},remove(index){const items=read();items.splice(index,1);write(items);},clear(){write([]);},total:items=>items.reduce((sum,x)=>sum+x.price*x.quantity,0)};
})(typeof window==='undefined'?globalThis:window);
