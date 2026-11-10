(() => {
 'use strict';
 const model=window.TESLA_VEHICLES.find(m=>m.id===document.querySelector('[data-model]').dataset.model);
 const form=document.getElementById('configuration'), feedback=document.getElementById('cart-feedback'), button=document.getElementById('add-cart');
 const priceFormat=new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0});
 function selection(){return model.colors[Number(new FormData(form).get('color'))];}
 function update(){
  const [name,,extra,status]=selection();
  document.getElementById('selected-price').textContent=priceFormat.format(model.price+extra);
  document.getElementById('selected-stock').textContent=status;
  document.getElementById('color-summary').textContent=name+' — '+status;
  button.disabled=status==='Indisponible';
  button.textContent=button.disabled?'Couleur indisponible':'Ajouter au panier';
  feedback.textContent='';
 }
 form.addEventListener('change',update);
 form.addEventListener('submit',event=>{
  event.preventDefault();
  const [color,,extra,status]=selection();
  if(status==='Indisponible') return;
  try {
   const raw=localStorage.getItem('tesla-demo-cart-v1');
   const cart=raw?JSON.parse(raw):[];
   if(!Array.isArray(cart)||!cart.every(item=>item && typeof item.id==='string' && typeof item.color==='string' && Number.isInteger(item.quantity) && item.quantity>0)) throw new Error('Invalid cart');
   const existing=cart.find(item=>item.id===model.id&&item.color===color);
   if(existing) existing.quantity+=1;
   else cart.push({id:model.id,name:model.name,color,price:model.price+extra,status,quantity:1,image:'assets/'+model.id+'.png'});
   localStorage.setItem('tesla-demo-cart-v1',JSON.stringify(cart));
   feedback.textContent=model.name+' · '+color+' ajouté au panier ('+cart.reduce((sum,item)=>sum+item.quantity,0)+' article(s)).';
  } catch(error) {
   feedback.textContent='Impossible d’enregistrer le panier. Vérifiez que le stockage du navigateur est autorisé. Aucun ajout n’a été confirmé.';
  }
 });
 update();
})();
