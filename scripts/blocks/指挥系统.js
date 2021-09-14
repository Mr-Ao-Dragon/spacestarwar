const range = 1000;
const targetRange = 32;
const maxNodes = 8;

function LinetargetRange(range){
    if(range<100) {
        return 3.125
    }else if(range>=100&&range<500){
        return 5.125
    }else{
        return 6.125
    }
}
const targetBlock = extendContent(Block, "targetBlock", {
	
	update(tile){
		const entity = tile.ent();

        
		var spotTile = Vars.world.tile(this.selectaSpots[tile.x + "," + tile.y]);
		const target = Units.closestTarget(tile.getTeam(), spotTile.drawx(), spotTile.drawy(), targetRange, boolf((e) => {return !e.isDead()}));
		
		
      /*  if(entity.linkdPos==undefined)entity.linkdPos=tile.pos();
        const linkdTile = Vars.world.tile(entity.linkdPos);
        if(!(linkdTile.block() instanceof Turret)){
            entity.linkdPos=tile.pos();
            return;
        };
        var linkdEntity =linkdTile.ent();*/
        
            
            
        if(target!=null/*entity.power.status >= 0.5*/){
            for(var i = 0; i < entity.power.links.size; i++){
            var link = Vars.world.tile(entity.power.links.get(i));
            
            
            var linkValid = (tile, link) => {if(tile == link || link == null || link.entity == null || tile.entity == null || tile.getTeam() != link.getTeam()) return false;
                return true;
            }
            
            
            if(link == null){
                entity.power.links.removeIndex(i);
            };

            if(!linkValid(tile, link)) continue;

            if(link.block() instanceof Turret){
                var linkEntity = link.ent();
                linkEntity.target = target;
              //  linkdEntity.target = target;
            }
        };
          /*  for(var i=0; maxLink>i; i++){
                if(entity.linkdPosArray[i]!=null){
                    entity.linkdPos = entity.linkdPosArray[i];
                    linkdEntity = entity.linkdPos.ent();
                    linkdEntity.target = target;
                };
            };*/
            
            
        }
    },

    buildConfiguration(tile,table){
        const entity = tile.ent();
        table.addImageButton(Icon.cancel, Styles.clearTransi, run(() => {
	    entity.selectTarget = 0;
    })).size(50)
    
    table.addImageButton(Icon.zoom, Styles.clearTransi, run(() => {
	    entity.selectTarget = 1;
    })).size(50)
    },
    playerPlaced(tile) {
        this.selectaSpots[tile.x + "," + tile.y] = tile.pos();
    },
    configured(tile, player, value) {
        this.selectaSpots[tile.x + "," + tile.y] = value;
    },
    onConfigureTileTapped(tile, other) {
    	
        const entity = tile.ent();
        if(other.block() instanceof Turret&&tile.getTeam()==other.getTeam()&&entity.selectTarget != 1){
            
            var valid = () => (other != null && other.entity != null) ? true : false;
            
            if(entity.power.links.contains(other.pos())){
                entity.power.links.removeValue(other.pos()); 
                return true;
                
            
                
               /*if(valid()) other.entity.power.links.removeValue(tile.pos());

            const newgraph = new PowerGraph();
            newgraph.reflow(tile);

            if(valid() && other.entity.power.graph != newgraph){
                const og = new PowerGraph();
                og.reflow(other.pos);
            };*/
            };
            
            
           // Effects.effect(Fx.explosion,other.drawx(),other.drawy(),0);
            
            
            
            if(!(entity.power.links.contains(other.pos()))/*&&entity.power.links.size < maxNodes*/){
                entity.power.links.add(other.pos());
            };
            
          //  entity.power.graph.add(other.entity.power.graph);
            
         //   entity.linkdPos=other.pos();
        };
        if(Math.pow(other.x - tile.x, 2) + Math.pow(other.y - tile.y, 2) > Math.pow((range - targetRange) / Vars.tilesize, 2)&&entity.selectTarget==1) return true;
        if(this.selectaSpots[tile.x + "," + tile.y] === other.pos()&&entity.selectTarget==1) return true;
        if(entity.selectTarget != 1)return true;
        tile.configure(other.pos());
        return false;
    },
    drawLayer(tile){
        var spotTile = Vars.world.tile(this.selectaSpots[tile.x + "," + tile.y]);
        const entity = tile.ent();
    	const target = Units.closestTarget(tile.getTeam(), spotTile.drawx(), spotTile.drawy(), targetRange, boolf((e) => {return !e.isDead()}));
    	
    	
    	
       /* if(entity.linkdPos==undefined)entity.linkdPos=tile.pos();*/
       
       var linkValid = (tile, link) => {if(tile == link || link == null || link.entity == null || tile.entity == null || tile.getTeam() != link.getTeam()) return false;
           return true;
       }
       
       // const linkdTile = Vars.world.tile(entity.linkdPos);
     /*   Drawf.laser(Core.atlas.find("minelaser"),Core.atlas.find("minelaser-end"),tile.drawx(),tile.drawy(),linkdTile.drawx(),linkdTile.drawy(),0.5); */
        const t1 = new Vec2(), t2 = new Vec2();
        for(var i = 0; i < entity.power.links.size; i++){
            var link = Vars.world.tile(entity.power.links.get(i));

            if(!linkValid(tile, link)) continue;

            if(!(link.block() instanceof Turret)) continue;
            
            var drawLaser = (tile,target) => {
        var opacityPercentage = Core.settings.getInt("lasersopacity");
        if(opacityPercentage == 0) return;

        const opacity = opacityPercentage / 100;

        var x1 = tile.drawx(),  y1 = tile.drawy(), x2 = target.drawx(), y2 = target.drawy();

        var angle1 = Angles.angle(x1, y1, x2, y2);
        t1.trns(angle1, tile.block().size * Vars.tilesize / 2 - 1.5);
        t2.trns(angle1 + 180, target.block().size * Vars.tilesize / 2 - 1.5);

        x1 += t1.x;
        y1 += t1.y;
        x2 += t2.x;
        y2 += t2.y;

        var fract = 1 - tile.entity.power.graph.getSatisfaction();
        

        Draw.color(Color.white, Pal.powerLight, fract * 0.86 + Mathf.absin(3, 0.1));
        Draw.alpha(opacity);
        Drawf.laser(Core.atlas.find("minelaser"),Core.atlas.find("minelaser-end"), x1, y1, x2, y2, 0.25);
        Draw.color();
    };

            drawLaser(tile, link);
            Lines.square(link.drawx(),link.drawy(),12,45 + Time.time() * 3);
        }

        Draw.reset();
        
    	if (target != null/*&&entity.power.status >= 0.5*/) {
        const ang = Mathf.slerpDelta(0, entity.angleTo(target), 1);
            	Draw.color(Color.valueOf("#ffffff85"));
            	Drawf.tri(tile.drawx(), tile.drawy(), 4.725, Mathf.dst(tile.drawx(), tile.drawy(),target.x,target.y) + Mathf.dst(tile.drawx(), tile.drawy(),target.x,target.y) * 0.28225,ang);
                Lines.stroke(1.725);
                Lines.square(target.x,target.y,  11, 45 + Time.time() * 2.5);
                Lines.square(target.x,target.y, 6.725, 45 - Time.time() * 2.5);
                };
                Draw.blend();
    },
    drawConfigure(tile){
        const entity = tile.ent();
        
    	if(entity.selectTarget == 1){
	        Draw.color(Color.valueOf("#AC5F35"));
	        Draw.blend(Blending.additive);
	        Fill.circle(tile.drawx(), tile.drawy(), range);
	        Draw.color(Color.valueOf("#FFFFFF"));
	        Lines.stroke(LinetargetRange(range));
	        Lines.circle(tile.drawx(), tile.drawy(),range);
	    }
	    Draw.blend();
        Draw.reset();
    }
});
targetBlock.entityType=prov(()=>extend(TileEntity,{
    getselectTarget(){return this._selectTarget},
    setselectTarget(value){this._selectTarget = value},
  /* getlinkdPosArray(){return this._linkdPosArray},
    setlinkdPosArray(value){this._linkdPosArray=value},*/
    _selectTarget:0,
    /*getlinkdPos(){return this._linkdPos},
    setlinkdPos(value){this._linkdPos=value;},
    write(stream){
        this.super$write(stream);
        stream.writeInt(this._linkdPos);
    },
    read(stream,revision){
        this.super$read(stream,revision);
        this._linkdPos=stream.readInt();
    },*/
    
    }));
targetBlock.health = 650;
targetBlock.size = 2;
targetBlock.localizedName = "指挥系统";
targetBlock.description = "不想再让一发超武打到杂鱼身上了？好的，让你的武器连上这个";
targetBlock.selectaSpots = {};
Object.assign(targetBlock,{
    update:true,
    hasPower:true,
    configurable:true,
    layer:Layer.power,
    hasItems:false
});
targetBlock.configurable = true



 