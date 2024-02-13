function(instance, properties) {
    const iconName = (properties.icon || "simple-icons:iconify").trim();
    const flipX = (properties.flipx) ? (180) : (0);
    const flipY = (properties.flipy) ? (180) : (0);

    instance.data.config = {
        spin: properties.spin,
        transition: properties.transition,
        iconName,
        flipY,
        flipX,
        color: properties.use_font_color ? properties.bubble.font_color() : properties.color,
        rotate: properties.rotate
    }
    
    instance.canvas.toggleClass("clickable-element", properties.clickable);
    
    if (properties.clickable && !instance.data.eventAttached) {
            instance.data.eventAttached = true;
        	instance.canvas.on('click', instance.data.handleClick);
    }
    
    if (!properties.clickable && instance.data.eventAttached) {
        instance.data.eventAttached = false;
        instance.canvas.off('click', instance.data.handleClick);
    }

    instance.data.reloadIconFunc(properties);
    instance.data.reloadStyleFunc();
    
	instance.data.icon.toggleClass("spin", properties.spin);

}