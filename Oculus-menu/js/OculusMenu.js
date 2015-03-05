window.osoco = {}

;(function() {
    function Menu(scene, camera, projector, raycaster) {
    	
    	this.scene = scene
    	this.camera = camera
    	this.projector = projector
    	this.raycaster = raycaster
    	
    	var currentMenu
    	//var menuDrawer = new es.osoco.vr.MenuDrawer()
    	
    	this.update = function() {
    		//rayTest(currentMenu)
    	}
    	 
    	var rayTest = function () {
            var vector = new THREE.Vector3( 0, 0, 1 );
            projector.unprojectVector( vector, camera );
            raycaster.set( camera.position, vector.sub(camera.position).normalize());
            
             // See if the ray from the camera into the world hits one of our meshes
             var intersects = raycaster.intersectObjects( currentMenu.children);

             if ( intersects.length > 0 ) {
                var selectedObject = intersects[0].object
                var currentTime = new Date().getTime()
                selectedObject.startSelectionTime = selectedObject.startSelectionTime || currentTime   
                
                if(selectedObject.startSelectionTime && currentTime - selectedObject.startSelectionTime > 1000) {
                    intersects[0].object.material = menuOptions.children[0].selected2Material
                    if(first) {   
                    setTimeout(function() {
                        translateCamera({x:100, y:100, z:100})
                        setTimeout(function() {
                            translateCamera({x:0, y:0, z:0})
                            setTimeout(rotateMenu, 400)
                        }, 3000)
                        
                    }, 100)
                    first = false
                    }
                    
                } else {
                   first = true
                    intersects[0].object.material = menuOptions.children[0].selectedMaterial
                } 
                 
             }
             
             // Toggle rotation bool for meshes that we clicked
             for (var i = 0; i < menuOptions.children.length; i++) {
                if(menuOptions.children[i] !== selectedObject) {
                    menuOptions.children[i].material = menuOptions.children[i].unselectedMaterial
                    menuOptions.children[i].startSelectionTime = 0
                }
             } 
        }
    } 

        function MenuDrawer() {
    	
    	
        }

        function MenuSelect() {
    		var menuItems = []
    		var imageUrl = ''
    	    
    		this.addMenuItem = function(menuItem) {
    			menuItems.push(menuItem)
    		}
    		
    		this.onSelectAction = function() {
    			
    		}
    	}

    	window.osoco.Menu = Menu
}())

THREE.Menu = window.osoco.Menu