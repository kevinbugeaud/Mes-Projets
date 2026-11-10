(() => {
 'use strict';
 let lang=new URLSearchParams(location.search).get('lang');
 if(!['fr','en'].includes(lang)){try{lang=localStorage.getItem('tesla-demo-language');}catch{} }
 lang=lang==='en'?'en':'fr';document.documentElement.lang=lang;
 const tr=s=>lang==='en'?(window.EN[s]??s):s;
 const money=n=>new Intl.NumberFormat(lang==='en'?'en-IE':'fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n);
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),nodes=[];
 while(walker.nextNode()) nodes.push(walker.currentNode);
 nodes.forEach(n=>{if(['SCRIPT','STYLE','OPTION'].includes(n.parentElement.tagName))return;const raw=n.textContent,key=raw.trim();if(key)n.textContent=raw.replace(key,tr(key));});
 document.querySelectorAll('[alt],[aria-label],[placeholder]').forEach(el=>['alt','aria-label','placeholder'].forEach(attr=>{if(el.hasAttribute(attr))el.setAttribute(attr,tr(el.getAttribute(attr)));}));
 document.title=tr(document.title);
 document.querySelectorAll('a[href]').forEach(a=>{const href=a.getAttribute('href');if(/^[a-z0-9-]+\.html(?:\?.*)?$/.test(href)){const url=new URL(href,location.href);url.searchParams.set('lang',lang);a.href=url.href;}});
 const select=document.getElementById('site-language');select.value=lang;
 select.addEventListener('change',()=>{try{localStorage.setItem('tesla-demo-language',select.value);}catch{}const url=new URL(location.href);url.searchParams.set('lang',select.value);location.href=url.href;});
 const error='Impossible d’enregistrer le panier. Vérifiez le stockage du navigateur ou la limite de 99 articles identiques.';
 const modelElement=document.querySelector('[data-model]');
 if(modelElement){
  const model=window.TESLA_VEHICLES.find(m=>m.id===modelElement.dataset.model),form=document.getElementById('configuration'),button=document.getElementById('add-cart'),feedback=document.getElementById('cart-feedback');
  const choice=()=>model.colors[Number(new FormData(form).get('color'))];
  const update=()=>{const [color,,extra,status]=choice();document.getElementById('selected-price').textContent=money(model.price+extra);document.getElementById('selected-stock').textContent=tr(status);document.getElementById('color-summary').textContent=tr(color)+' — '+tr(status);button.disabled=status==='Indisponible';button.textContent=tr(button.disabled?'Couleur indisponible':'Ajouter au panier');feedback.textContent='';};
  form.addEventListener('change',update);form.addEventListener('submit',e=>{e.preventDefault();const [color,,extra,status]=choice();if(status==='Indisponible')return;try{Cart.add({id:model.id,name:model.name,color,price:model.price+extra,status,image:'assets/'+model.id+'.png'});feedback.textContent=model.name+' · '+tr(color)+' — '+tr('Ajouté au panier.');}catch{feedback.textContent=tr(error);}});update();
 }
 document.querySelectorAll('[data-add-charger]').forEach(button=>button.addEventListener('click',()=>{const c=window.TESLA_CHARGERS.find(x=>x.id===button.dataset.addCharger),message=button.nextElementSibling;try{Cart.add({id:c.id,name:c.name,color:c.color,price:c.price,status:'Disponible',image:'assets/'+c.id+'.svg'});message.textContent=c.name+' — '+tr('Ajouté au panier.');}catch{message.textContent=tr(error);}}));
 const cartContainer=document.getElementById('cart-items');
 if(cartContainer){
  const message=document.getElementById('cart-message'),total=document.getElementById('cart-total');
  const el=(tag,text,cls)=>{const e=document.createElement(tag);if(text)e.textContent=text;if(cls)e.className=cls;return e;};
  function render(){cartContainer.replaceChildren();total.textContent='';let items;try{items=Cart.read();}catch{message.textContent=tr('Le panier enregistré est illisible ou inaccessible. Vous pouvez essayer de le réinitialiser.');const reset=el('button',tr('Réinitialiser le panier'),'secondary-button');reset.onclick=()=>{try{Cart.clear();message.textContent=tr('Panier réinitialisé.');render();}catch{message.textContent=tr(error);}};cartContainer.append(reset);return;}
   if(!items.length){cartContainer.append(el('p',tr('Votre panier est vide.'),'empty-cart'));return;}
   items.forEach((item,index)=>{const row=el('article',null,'cart-row'),img=el('img');img.src=item.image;img.alt=item.name;const info=el('div');info.append(el('h2',item.name),el('p',tr(item.color)+' · '+tr(item.status||'Disponible')),el('p',money(item.price)+' / '+tr('unité')));const actions=el('div',null,'cart-actions'),label=el('label',tr('Quantité'));label.htmlFor='quantity-'+index;const input=el('input');input.id=label.htmlFor;input.type='number';input.min=1;input.max=99;input.step=1;input.value=item.quantity;input.setAttribute('aria-label',tr('Quantité')+' — '+item.name+' '+tr(item.color));input.onchange=()=>{const v=Number(input.value);if(!input.checkValidity()||!Number.isInteger(v)){input.reportValidity();input.value=item.quantity;return;}try{Cart.quantity(index,v);message.textContent=tr('Quantité mise à jour.');render();document.getElementById(input.id)?.focus();}catch{message.textContent=tr(error);input.value=item.quantity;}};const remove=el('button',tr('Supprimer'));remove.setAttribute('aria-label',tr('Supprimer')+' '+item.name+' '+tr(item.color));remove.onclick=()=>{try{Cart.remove(index);message.textContent=item.name+' — '+tr('Article supprimé.');render();(cartContainer.querySelector('button')||document.querySelector('.info-link'))?.focus();}catch{message.textContent=tr(error);}};actions.append(label,input,remove);row.append(img,info,actions);cartContainer.append(row);});
   total.textContent=tr('Total')+' : '+money(Cart.total(items));
  }render();window.addEventListener('storage',e=>{if(e.key==='tesla-demo-cart-v1')render();});
 }
 const support=document.getElementById('support-form');
 if(support)support.addEventListener('submit',e=>{e.preventDefault();const subject=support.elements.subject,description=support.elements.description;subject.setCustomValidity(subject.value.trim()?'':tr('Veuillez saisir un sujet.'));description.setCustomValidity(description.value.trim().length>=10?'':tr('Veuillez saisir au moins 10 caractères.'));if(!support.reportValidity())return;document.getElementById('support-message').textContent=tr('Démonstration validée : aucun ticket n’a été envoyé.');support.reset();});
 if(support)support.addEventListener('input',e=>e.target.setCustomValidity?.(''));
 const login=document.getElementById('login-form');
 if(login){document.getElementById('show-password').addEventListener('change',e=>document.getElementById('login-password').type=e.target.checked?'text':'password');login.addEventListener('submit',e=>{e.preventDefault();document.getElementById('login-message').textContent=tr('Démonstration uniquement : aucune connexion réelle. Votre mot de passe n’a pas été enregistré.');login.reset();document.getElementById('login-password').type='password';});}
})();
