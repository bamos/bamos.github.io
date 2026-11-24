// Sparse document placement and bounded scroll parallax.
export function objectPositions(count, height, end) {
    const first = Math.min(height * .22, 180), last = Math.max(first,end - 200);
    // Two pieces per viewport at most, including their animated extents. A
    // short page uses fewer slots instead of extending the document to fit them.
    const capacity = Math.max(0,Math.floor((last-first)/((height+420)/2))+1);
    const visible = Math.min(count,capacity);
    return Array.from({length:visible},(_,i)=>first+(last-first)*i/Math.max(1,visible-1));
}

// Bounded, continuous, 6% of scroll speed at its fastest; reversible on ascent.
export const backgroundOffset = scrollY => -70 * Math.sin(scrollY / 1200);

// Anchor the last field to publications, not its rank among decorative pieces.
// Removing a creature must never push it into the final talks/footer.
export function publicationFieldTop(start,end,fieldHeight) {
    const gap=Math.max(0,end-start);
    return Math.max(start+Math.min(40,gap/4),Math.min(start+gap*.76,end-fieldHeight-40));
}
