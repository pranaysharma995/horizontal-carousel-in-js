class HorizontalCarousel{
    constructor(parent,child,transition=800)
    {
        this.container=parent;
        this.slides=child;
        this.scrollvalue=child[0].clientWidth;
        this.transitionValue=transition;
        this.current=1;
        this.emptySpace=window.innerWidth - this.scrollvalue;

    }
    default=async () =>
    {
        await this.createBullet();
        this.addActive();
        this.addParentDrag();
        this.addLoop();
        this.anim();

    }
    prev()
    {

        this.current--;
        this.addBulletClick(this.transitionValue);
    }
    next()
    {
        this.current++;
        this.addBulletClick(this.transitionValue);
    }

    anim=(value=this.transitionValue) =>
    {
        let center=this.emptySpace/2;

        this.container.style.transitionDuration=`${value}ms`;
        let transformValue=`translateX(${-(this.scrollvalue*this.current)+center}px)`;
        this.container.style.transform=transformValue;
    }

    createBullet=()=>
    {
        let _this=this;
        let bulletContainer=document.createElement("div");
        bulletContainer.className="bullet-container";
        for(let i=0;i<this.slides.length;i++)
        {

            let bullet=document.createElement("span");
            bullet.className="bullet";
            bulletContainer.appendChild(bullet);

            bullet.addEventListener("click",function()
            {
                _this.current=i+1;
                _this.addBulletClick(_this.transitionValue);
            })
        }

        this.container.parentElement.appendChild(bulletContainer);

    }
    addBulletClick=(anim) =>
    {
        this.addActive();
        this.anim(anim);


    }

    addParentDrag=() =>
    {
        let _this=this;
        let start=0;
        this.container.addEventListener("dragstart",function(e)
        {
            start=e.clientX;
        })
        this.container.addEventListener("dragend",function(e)
        {
            let end=start-e.clientX;
            if(end > 0)
            {
                _this.next()
            }
            else
            {
                _this.prev()
            }
        })
        this.container.addEventListener("touchstart",function(e)
        {
           start=e.touches[0].clientX
        })
        this.container.addEventListener("touchend",function(e)
        {
            let end=e.changedTouches[0].clientX-start;
            if(end > 0)
            {
                _this.next()
            }
            else
            {
                _this.prev()
            }
        })

    }

    addLoop=() =>
    {
        let first=this.slides[0].cloneNode(true);
        let last=this.slides[this.slides.length-1].cloneNode(true);
        this.container.appendChild(first);
        this.container.insertBefore(last,this.container.firstChild);
        let _this=this;

        this.container.addEventListener("transitionend",function()
        {
            if(_this.current >_this.slides.length)
            {
                _this.current=1;
                _this.addBulletClick(0);

            }
            if(_this.current < 1)
            {
                _this.current=_this.slides.length;
                _this.addBulletClick(0)
            }

        })

    }

    addActive=() =>
    {
        let bullets=this.container.parentElement.querySelectorAll(".bullet");
        bullets.forEach((item,index) => item.classList.toggle("active",index=== this.current-1))
        this.slides.forEach((item,index) => item.classList.toggle("active",index=== this.current-1))
    }
}

