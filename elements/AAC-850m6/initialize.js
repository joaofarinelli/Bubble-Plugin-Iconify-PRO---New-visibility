function(instance, context) {
    const id = 'iconify-' + Math.random().toString(36).substr(2, 5);
    instance.data.id = id;
    
    const icon = jQuery(`<iconify-icon id="${id}"></iconify-icon>`);
    const styleSheet = jQuery(`<style></style>`);
    instance.data.icon = icon;
    instance.data.styleSheet = styleSheet;
    
    
    instance.data.handleClick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        instance.triggerEvent("clicked");
    };
    
    
    instance.canvas.append(styleSheet).append(icon);
    instance.canvas.css({
        "display": "flex",
        "align-items": "center",
        "justify-content": "center"
    });
    
    instance.data.reloadIconFunc = function(properties) {
        const {
            width, 
            height,
            padding_horizontal, 
            padding_vertical, 
            border_width, 
            border_height,
            border_style, 
            border_width_right, 
            border_width_left, 
            border_width_top,
            border_width_bottom,
            four_border_style,
            border_style_right,
            border_style_left,
            border_style_top,
            border_style_bottom,
        } = properties.bubble;
        
        
        let totalBorderWidth = 0;
        let totalBorderHeight = 0;
		if (!four_border_style()) {
            if (border_style() === "none") {
                totalBorderWidth = 0;
                totalBorderHeight = 0;
            } else {                
	            totalBorderWidth = border_width() * 2;
                totalBorderHeight = totalBorderWidth;
            }
        } else {
            const widthRight = border_style_right() === "none" ? 0 : border_width_right();
            const widthLeft = border_style_left() === "none" ? 0 : border_width_left();
            totalBorderWidth = widthLeft + widthRight;
            
            const heightTop = border_style_top() === "none" ? 0 : border_width_top();
            const heightBottom = border_style_bottom() === "none" ? 0 : border_width_bottom();
            totalBorderHeight = heightTop + heightBottom;
        }
        
        const iconWidth = width() - padding_horizontal() * 2 - totalBorderWidth;
		const iconHeight = height() - padding_vertical() * 2 - totalBorderHeight;
        icon.attr("icon", instance.data.config.iconName);
        icon.attr("width", iconWidth);
    }
	
    instance.data.reloadStyleFunc = function() {
        let {flipX, flipY, rotate, color, transition} = instance.data.config;
        const styleSheetHtml = `
                #${id} {
                    width: 100%;
                    height: 100%;
                    color: ${color};
                    transform: rotate(${rotate}deg) rotateX(${flipX}deg) rotateY(${flipY}deg);
                    transition: ${transition};
                }
                #${id}.spin {
                    animation: ${id} 2s infinite linear;
                }
                @keyframes ${id} {
                    from {
                        transform: rotate(0deg);
                    } 
                    to {
                        transform: rotate(359deg);
                    }
                }
    	`;
        
        styleSheet.html(styleSheetHtml);
    }   
}