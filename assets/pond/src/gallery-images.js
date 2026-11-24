// Presentation choices for the post only; all publications stay on the homepage.
const omitted=new Set(['chen2022semi','cohen2021riemannian','paulus2021comboptnet','chen2021neural','sercu2020neural','amos2019limited']);
const titles={reflection2026beam:'Beam',haviv2024wasserstein:'Wasserstein flow matching',atanackovic2024meta:'Meta flow matching',amos2023amortizing:'Convex conjugates',fickinger2021crossdomain:'Cross-domain imitation',cohen2020aligning:'Aligning time series',chen2021learning:'Neural event functions'};
export function imageStudy(source,label) {
    const key=source.split('/').at(-1).replace(/\.[^.]+$/,'');
    return {show:!omitted.has(key),title:titles[key]||label};
}
