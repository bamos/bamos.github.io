import {initAbstracts} from '/js/publication-abstracts.js';

async function validate(variant) {
    await document.fonts.ready;
    await Promise.all([...document.images].map(image=>image.decode().catch(()=>{})));
    if(variant==='short')document.querySelectorAll('.abstract-box p').forEach(p=>{p.textContent=p.textContent.trim().slice(0,160)+'.';});
    const rows=[...document.querySelectorAll('tr')];
    const positions=rows.map(row=>{
        const image=row.querySelector('img').getBoundingClientRect(),r=row.getBoundingClientRect();
        return [image.left-r.left,image.top-r.top];
    });
    rows.forEach(row=>{row.querySelector('.abstract-box').style.display='block';});
    initAbstracts();
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
    const cases=rows.map((row,i)=>{
        const image=row.querySelector('img'),picture=image.getBoundingClientRect(),r=row.getBoundingClientRect();
        const box=row.querySelector('.abstract-box'),b=box.getBoundingClientRect(),style=getComputedStyle(box),lineHeight=parseFloat(style.lineHeight);
        const errors=[],check=(condition,message)=>{if(!condition)errors.push(message);};
        check(image.complete&&image.naturalWidth>0,'image failed to load');
        check(Math.abs(picture.left-r.left-positions[i][0])<1&&Math.abs(picture.top-r.top-positions[i][1])<1,'image moved when abstract opened');
        check(b.right<=innerWidth+1&&b.left>=0,'abstract overflows viewport');
        check(picture.right<=innerWidth+1&&picture.left>=0,'image overflows viewport');
        if(innerWidth<768) {
            const title=row.querySelector('em').getBoundingClientRect();
            const number=document.createRange();number.selectNodeContents(row.cells[0]);
            check(Math.abs(number.getBoundingClientRect().top-title.top)<1,'number is not aligned with the title');
            check(picture.top>=title.bottom+12,'image is not below the citation');
            check(Math.abs(picture.left-title.left)<1,'image is not aligned with the citation');
            check(b.top>=picture.bottom+8,'abstract is not below the image');
        }
        const lines=[];
        for(const paragraph of box.querySelectorAll('p')) {
            const range=document.createRange();range.selectNodeContents(paragraph);
            lines.push(...range.getClientRects());
        }
        const overlap=picture.bottom>b.top&&picture.left>b.left;
        if(overlap) {
            const beside=lines.filter(line=>line.top<picture.bottom&&line.bottom>picture.top);
            beside.forEach(line=>check(line.right<=picture.left-22,'text is too close to the image/inside corner'));
            const beneath=lines.filter(line=>line.top>=picture.bottom&&line.right>picture.left);
            if(beneath.length) {
                const gap=Math.min(...beneath.map(line=>line.top))-picture.bottom;
                check(gap>=11,'insufficient padding below the image');
                check(gap<=lineHeight+20,'excess blank space below the image');
            }
            check(parseFloat(getComputedStyle(image).marginBottom)<=14,'float reserves too much space below the image');
        }
        const outline=box.querySelector('.abstract-outline path');
        check(outline&&!/NaN|Infinity/.test(outline.getAttribute('d')),'outline is invalid');
        const name=`${innerWidth}px ${variant} ${row.id}`;
        const result=document.createElement('p');result.className='case-result';result.textContent=(errors.length?'FAIL: ':'PASS: ')+name+(errors.length?' — '+errors.join('; '):'');
        row.closest('table').after(result);
        return {name,errors};
    });
    parent.postMessage({publicationResults:true,key:innerWidth+variant,cases},location.origin);
}
