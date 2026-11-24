// Enclosed gaps in the Beam mark are quiet water, not another splash source.
export function exteriorContours(contours) {
    function inside([x,y],polygon) {
        let result=false;
        for(let i=0,j=polygon.length-1;i<polygon.length;j=i++) {
            const [ax,ay]=polygon[i],[bx,by]=polygon[j];
            if((ay>y)!==(by>y)&&x<(bx-ax)*(y-ay)/(by-ay)+ax)result=!result;
        }
        return result;
    }
    return contours.filter((points,i)=>!contours.some((other,j)=>i!==j&&inside(points[0],other)));
}
export function imageRippleContours(item,contours) {
    const image=item.tagName==='IMG'?item:item.querySelector('img');
    return image?.getAttribute('src')?.includes('reflection2026beam')?exteriorContours(contours):contours;
}
