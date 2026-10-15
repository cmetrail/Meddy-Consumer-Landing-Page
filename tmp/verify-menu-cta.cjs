const {chromium}=require('C:/Users/User/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{const b=await chromium.launch();for(const width of [1440,390]){
 const p=await b.newPage({viewport:{width,height:900}});await p.goto('http://localhost:3000',{waitUntil:'networkidle'});
 const read=e=>{const s=getComputedStyle(e);return Object.fromEntries(['backgroundColor','color','padding','borderRadius','fontSize','fontWeight','lineHeight','textTransform','boxShadow'].map(k=>[k,s[k]]));};
 const header=await p.locator('header a[href="/book-consultation"]').evaluate(read);
 await p.getByRole('button',{name:'Open menu',exact:true}).click();
 const menu=await p.getByRole('dialog').locator('a[href="/book-consultation"]').evaluate(read);
 require('node:assert/strict').deepEqual(menu,header);console.log(width,'button styles match header');await p.close();
}await b.close();})().catch(e=>{console.error(e);process.exit(1)});

