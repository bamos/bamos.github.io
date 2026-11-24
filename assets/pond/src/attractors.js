import {mountAttractor,marginPlacement} from './attractor-renderer.js';
import {mobiusDefinition,mobiusSpherePlacement} from './mobius.js';
import {portraitField,mobilePondWidth} from './mobile-policy.js';
import {publicationFieldTop} from './layout.js';

export function attractorDefinition(kind,options) {
    if(kind==='mobius')return mobiusDefinition(options);
    throw new Error(`Unknown field: ${kind}`);
}
export function initExtraAttractors() {
    return [...document.querySelectorAll('[data-attractor]')].map(field=>{
        const kind=field.dataset.attractor,pond=field.parentElement,ball=pond.querySelector('.water-mobius-ball');
        let renderer,renderedDefinition;
        const layout=()=>{
            const r=document.querySelector('.water-content table').getBoundingClientRect();
            const mobile=pond.clientWidth<=mobilePondWidth;
            const portrait=document.querySelector('.index-profile-img').getBoundingClientRect();
            const gutter=pond.clientWidth-r.right,p=mobile?portraitField(pond.clientWidth,{right:portrait.right,top:portrait.top+scrollY,height:portrait.height}):marginPlacement(gutter,{aspect:1.15,maxWidth:280});
            const left=mobile?p.left:pond.clientWidth-p.left-p.width;
            const options={portrait:mobile,wide:p.width>p.height};
            const definition=attractorDefinition(kind,options);
            field.style.width=p.width+'px';field.style.height=p.height+'px';field.style.left=left+'px';
            const start=document.getElementById('publications').getBoundingClientRect().top+scrollY;
            const end=document.getElementById('code').getBoundingClientRect().top+scrollY;
            field.style.top=(mobile?p.top:publicationFieldTop(start,end,p.height))+'px';
            if(!ball.classList.contains('water-placed')){
                const size=Math.max(24,Math.min(58,Math.min(p.width,p.height)*.3));ball.style.width=ball.style.height=size+'px';
                const home=mobiusSpherePlacement({left,top:field.offsetTop,width:p.width,height:p.height},size,options);
                ball.style.left=home.left+'px';ball.style.top=home.top+'px';
            }
            ball.hidden=field.hidden;ball.classList.add('water-visible');
            if(renderedDefinition!==definition) {
                renderer?.destroy();
                renderer=mountAttractor(field,ball,definition);
                renderedDefinition=definition;
            }else renderer.invalidate();
        };
        document.addEventListener('pond:layout',layout);layout();
        return {destroy(){document.removeEventListener('pond:layout',layout);renderer?.destroy();}};
    });
}
