<<<<<<< HEAD
let imageLoaded=0;
let images=[];
const frames={
    currentIndex:0,
    maxIndex:299
};
const canvas=document.querySelector(".canvas");
const context=canvas.getContext("2d");

function preloadImages(){
    for(var i=0;i<=frames.maxIndex;i++){
        const imageUrl=`./frames2/Earbuds_animation(1080p)_${i.toString().padStart(3,"0")}.png`;
        
        const img=new Image();
        img.src=imageUrl;

        img.onload=function(){
            imageLoaded ++;
            if(imageLoaded===frames.maxIndex){
                console.log("all images loaded");
                loadImage(frames.currentIndex);
                startAnimation();
            }
        }
        images.push(img);
    }
}

function loadImage(index){
    if(index>=0 && index<frames.maxIndex){
        const img=images[index];
        if(img){
        
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
        const scalex=canvas.width/img.width;
        const scaley=canvas.height/img.height;
        const scale=Math.max(scalex,scaley);
        const newwidth=img.width*scale;
        const newheiht=img.height*scale;
        const offsetX=(canvas.width-newwidth)/2;
        const offsetY=(canvas.height-newheiht)/2;
        
        context.clearRect(0,0,canvas.width,canvas.height);
        context.imageSmoothingEnabled=true;
        context.imageSmoothingQuality="high"
        createImageBitmap(img).then(bitmap => {
            context.drawImage(bitmap, offsetX, offsetY, newwidth, newheiht);
        });
        frames.currentIndex=index;
        }else{
            console.log("image not exist");
        }
    }
}
function startAnimation() {
    gsap.registerPlugin(ScrollTrigger);

   var tl= gsap.timeline({
        ease: "linear",
        scrollTrigger: {
            trigger: ".main",
            start: "top top",
            end: "bottom bottom",
            scrub:true,
        }
    })
    function updateFrame(index){
        return{
            currentIndex:index,
            ease:"linear",
            onUpdate:function(){
                requestAnimationFrame(()=>{
                    loadImage(Math.floor(frames.currentIndex))
                })
            }
        }
    }
    tl
    .to(frames,updateFrame(50),"first")
    .to(".animate1",{opacity:0,ease:"linear"},"first")
    .to(frames,updateFrame(100),"second")
    .to(".animate2",{opacity:1,ease:"linear"},"second")
    .to(frames,updateFrame(150),"third")
    .to(".animate3",{opacity:1,ease:"linear"},"third")
    .to(".animate2",{opacity:0,ease:"linear"},"third")
    .to(frames,updateFrame(200),"four")
    .to(".animate4",{opacity:1,ease:"linear"},"four")
    .to(".animate3",{opacity:0,ease:"linear"},"four")
    .to(frames,updateFrame(250),"six")
    .to(".animate6",{opacity:1,ease:"linear"},"six")
    .to(".animate4",{opacity:0,ease:"linear"},"six")
    .to(frames,updateFrame(299),"seven")
    .to(".animate7",{opacity:1,ease:"linear"},"seven")
    .to(".animate5",{opacity:0,ease:"linear"},"seven")
}
preloadImages();

let resizeTimeout;
window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
        loadImage(Math.floor(frames.currentIndex));
    }, 100);
});

//lenis smoothscroll code 
const lenis = new Lenis()
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
