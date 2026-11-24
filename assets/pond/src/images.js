// Preserve the image link and its layout slot while allowing direct dragging.
export function prepareImages(images) {
    return images.map(picture => {
        const portrait = picture.classList.contains('index-profile-img');
        let link = picture.closest('a');
        if (!link) {
            link = document.createElement('a'); link.href=picture.getAttribute('src');
            link.target='_blank'; link.rel='noopener'; link.setAttribute('aria-label','Open full-size portrait of Brandon Amos');
            picture.before(link); link.append(picture);
        }
        const frame=document.createElement('span');
        frame.className='water-image-frame water-portrait'+(portrait?' water-profile-frame':'');
        const title=picture.closest('tr')?.querySelector('em a')?.textContent;
        if(!portrait) picture.alt='Illustration: '+(title || 'publication');
        picture.draggable=false; picture.removeAttribute('title');
        link.before(frame); frame.append(link);
        return frame;
    });
}
