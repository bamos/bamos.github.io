// The mobile homepage is a small pond beside the portrait, not a second layer
// over publications. Gallery demonstrations retain their own bounded surfaces.
export const mobilePondWidth=767;
export function interactionRegion(width,introBottom,scroll=0) {
    return {mobile:width<=mobilePondWidth,active:width>mobilePondWidth||scroll<introBottom,visibleHeight:Math.max(0,introBottom-scroll)};
}
export function portraitField(availableWidth,portrait) {
    const left=portrait.right+8,width=Math.max(0,availableWidth-left-12);
    return {left,top:portrait.top+4,width,height:Math.max(0,portrait.height-8)};
}
export function mobileItemAllowed(width,introBottom,scroll,portrait=false) {
    return width>mobilePondWidth||(scroll<introBottom&&portrait);
}
