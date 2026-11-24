import { prepare } from './silhouettes.js';
import { objectWave, drawDrop } from './waves.js';
import { imageRippleContours } from './image-ripples.js';

// Static object/drop snapshots share silhouettes, scale, and wave painting.
// Used by both the pond gallery and the private seed/time review tool.
export async function pieceSnapshot(item,{width=360,height=240,size=96,imageWidth=185,imageHeight=130}={}) {
    const shape=await prepare(item);
    if(!shape?.contours.length)throw Error('Could not decode '+(item.ariaLabel||item.alt));
    const ratio=shape.viewBox?shape.viewBox.width/shape.viewBox.height:shape.image.naturalWidth/shape.image.naturalHeight;
    const w=item.tagName==='IMG'?Math.min(imageWidth,imageHeight*ratio,shape.image.naturalWidth):Math.min(size,size*ratio),h=w/ratio,x=(width-w)/2,y=(height-h)/2;
    const wave=objectWave(imageRippleContours(item,shape.contours).map(points=>points.map(([px,py])=>[x+px*w,y+py*h])));
    return (ctx,age)=>{
        drawDrop(ctx,{wave},age);
        ctx.save();
        if(item.classList.contains('index-profile-img')){ctx.beginPath();ctx.roundRect(x,y,w,h,8);ctx.clip();}
        ctx.drawImage(shape.image,x,y,w,h);ctx.restore();
    };
}
